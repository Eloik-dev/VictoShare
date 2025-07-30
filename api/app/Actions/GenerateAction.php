<?php

namespace App\Actions;

use App\Constants\HttpCodes;
use App\Models\Resource;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Str;
use ZipArchive;

class GenerateAction
{
    /**
     * Traitement des fichiers et génération du code d'accès
     * Si un ancien token est passé, l'ancienne ressource associée est supprimée et renouvelée
     * 
     * @param Request $request
     * @return JsonResponse
     */
    public function execute(Request $request): JsonResponse
    {
        $request->validate([
            'link' => 'nullable|url',
            'files.*' => 'nullable|file',
            'oldToken' => 'nullable|string'
        ]);

        $link = $request->input('link');
        $files = $request->file('files');
        $oldToken = $request->input('oldToken');

        if ($oldToken) {
            $resources = Resource::where('token', $oldToken)->get();
            foreach ($resources as $resource) {
                $resource->delete();
            }
        }

        if (is_array($files)) {
            $result = $this->processFiles($files);
        } elseif (is_string($link)) {
            if (!filter_var($link, FILTER_VALIDATE_URL)) {
                return response()->json(['error' => 'L\'URL est invalide'], HttpCodes::BAD_REQUEST);
            }

            $result = $this->generateToken(Resource::LINK_TYPE, $link);
        } else {
            return response()->json(['error' => 'La ressource est invalide'], HttpCodes::BAD_REQUEST);
        }

        return response()->json(['token' => $result]);
    }

    /**
     * Traitement des fichiers et génération du code d'accès
     * 
     * @param UploadedFile[] $files
     * @return string
     */
    private function processFiles(array $files): string
    {
        $file = $files[0];
        $folderName = Str::random(16);
        if (count($files) > 1) {
            $tmpFile = tempnam(sys_get_temp_dir(), 'temp-zip-');
            $zip = new ZipArchive();
            $zip->open($tmpFile, ZipArchive::CREATE);

            foreach ($files as $file) {
                $zip->addFile($file->getRealPath(), $file->getClientOriginalName());
            }

            $zip->close();
            $file = new UploadedFile($tmpFile, $file->getClientOriginalName());

            $now = now()->format('Y-m-d_H-i-s');
            $path = $file->storeAs($folderName, "telechargement_$now.zip");
        } else {
            $path = $file->storeAs($folderName, $file->getClientOriginalName());
        }

        return $this->generateToken(Resource::FILE_TYPE, $path);
    }

    /**
     * Génération du code d'accès
     * 
     * @param int $type Le type de la ressource
     * @param string $value La valeur de la ressource
     * @throws \Exception Si la ressource n'a pas pu être sauvegardée
     * @return string
     */
    private function generateToken(int $type, string $value): string
    {
        $resource = new Resource();
        $resource->token = Str::random(26);
        $resource->type = $type;
        $resource->value = $value;

        $user = auth()->user();
        if (!$user) {
            $user = User::create([
                'username' => 'Invité_' . $resource->token,
                'email' => $resource->token . '@guest.com',
                'password' => bcrypt($resource->token),
                'is_guest' => true,
                'guest_expires_at' => now()->addHours(2),
            ]);

            $user->prunable()
                ->where('is_guest', true)
                ->where('guest_expires_at', '<=', now());
        }
        $resource->user_id = $user->id;

        if (!$resource->save()) {
            if ($user->is_guest) {
                $user->delete();
            }
            throw new Exception('Failed to save resource', 500);
        }

        return $resource->token;
    }
}

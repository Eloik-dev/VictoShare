<?php

namespace App\Http\Controllers;

use App\Models\Resource;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;
use ZipArchive;

class ShareController extends Controller
{
    public function index(string $token)
    {
        $resource = Resource::where('token', $token)->first();
        return response()->json($resource);
    }

    public function generate(Request $request)
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
                Log::warning('Invalid URL', ['url' => $link]);
                return response()->json(['error' => 'Invalid URL'], 400);
            }

            $result = $this->processUrl($link);
        } else {
            Log::warning('Invalid resource type');
            return response()->json(['error' => 'Invalid resource type'], 400);
        }

        return response()->json(['token' => $result], 200);
    }

    /**
     * Access the resource
     */
    public function access(string $token)
    {
        $resource = Resource::where('token', $token)->first();

        if (!$resource) {
            return response()->json(['error' => 'Resource not found'], 404);
        }

        if ($resource->type === Resource::FILE_TYPE) {
            $path = storage_path("app/private/{$resource->value}");
            if (file_exists($path)) {
                return response()->download($path);
            }
        } else {
            return response()->redirectTo($resource->value);
        }
    }

    private function processUrl(string $url): string
    {
        return $this->generateToken(Resource::LINK_TYPE, $url);
    }

    /**
     * Process uploaded files
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

    private function generateToken(int $type, string $value): string
    {
        $resource = new Resource();
        $resource->token = Str::random(26);
        $resource->type = $type;
        $resource->value = $value;

        if (!$resource->save()) {
            throw new Exception('Failed to save resource', 500);
        }

        return $resource->token;
    }
}

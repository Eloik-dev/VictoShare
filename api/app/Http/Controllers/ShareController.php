<?php

namespace App\Http\Controllers;

use App\Actions\GenerateAction;
use App\Constants\HttpCodes;
use App\Models\History;
use App\Models\Resource;
use App\Models\User;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;
use Symfony\Component\HttpFoundation\BinaryFileResponse;
use ZipArchive;

/**
 * Contrôleur servant à la gestion des ressources partagées
 */
class ShareController extends Controller
{
    /**
     * Retourne une ressource en fonction de son code d'accès
     * 
     * @param string $token Le code d'accès de la ressource
     * @return JsonResponse
     */
    public function index(string $token): JsonResponse
    {
        $resource = Resource::where('token', $token)->first();
        $resource->setAttribute('info', $resource->getInfo());

        return response()->json($resource);
    }

    /**
     * Retourne toutes les ressources d'un utilisateur
     * 
     * @return JsonResponse
     */
    public function getAll(): JsonResponse
    {
        $user = auth()->user();
        $resources = Resource::where('user_id', $user->id)->get();

        return response()->json(['resources' => $resources]);
    }

    /**
     * Retourne l'historique d'utilisation d'une ressource
     * 
     * @param int $resourceId L'id de la ressource
     * @return JsonResponse
     */
    public function history(int $resourceId): JsonResponse
    {
        $histories = History::with('user')->where('resource_id', $resourceId)->get();

        return response()->json(['histories' => $histories]);
    }

    /**
     * Génère une ressource selon son type et retourne son code d'accès
     * 
     * @param Request $request
     * @param GenerateAction $generateAction
     * @return JsonResponse
     */
    public function generate(Request $request, GenerateAction $generateAction): JsonResponse
    {
        return $generateAction->execute($request);
    }

    /**
     * Accède à une ressource en fonction de son code d'accès et son type
     * Démarre un téléchargement si la ressource est un fichier
     * Redirige vers l'url si la ressource est un lien
     * 
     * @param string $token Le code d'accès de la ressource
     * @return JsonResponse|RedirectResponse|BinaryFileResponse
     */
    public function access(string $token): BinaryFileResponse|JsonResponse|RedirectResponse
    {
        $resource = Resource::where('token', $token)->first();

        if (!$resource) {
            return response()->json(['error' => 'La resource n\'existe pas'], HttpCodes::NOT_FOUND);
        }

        $userId = null;
        if (auth('sanctum')->check()) {
            $userId = auth('sanctum')->id();
        }

        History::create([
            'user_id' => $userId,
            'resource_id' => $resource->id,
            'ip_address' => request()->ip(),
            'user_agent' => request()->header('User-Agent'),
        ]);

        if ($resource->type !== Resource::FILE_TYPE) {
            return response()->redirectTo($resource->value);
        }

        $path = storage_path("app/private/{$resource->value}");
        if (file_exists($path)) {
            return response()->download($path);
        }

        return response()->json(['error' => 'La resource n\'existe pas'], HttpCodes::NOT_FOUND);
    }
}

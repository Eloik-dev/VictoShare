<?php

namespace App\Http\Controllers;

use App\Actions\ResourceController\GenerateAction;
use App\Constants\HttpCodes;
use App\Models\History;
use App\Models\Resource;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\BinaryFileResponse;

/**
 * Contrôleur servant à la gestion des ressources partagées
 */
class ResourceController extends Controller
{
    /**
     * Retourne une ressource en fonction de son code d'accès
     * 
     * @see \Tests\Feature\ResourceController\ResourceControllerIndexTest
     * @param string $token Le code d'accès de la ressource
     * @return JsonResponse
     */
    public function index(string $token): JsonResponse
    {
        $resource = Resource::where('token', $token)->first();
        if (!$resource) {
            return response()->json(null, HttpCodes::NOT_FOUND);
        }

        $resource->setAttribute('info', $resource->getInfo());

        return response()->json($resource);
    }

    /**
     * Supprime une ressource par son id
     * 
     * @see \Tests\Feature\ResourceController\ResourceControllerDeleteTest
     * @param string $id L'id de la ressource
     * @return JsonResponse
     */
    public function delete(string $id): JsonResponse
    {
        $resource = Resource::find($id);
        if (!$resource) {
            return response()->json(null, HttpCodes::NOT_FOUND);
        }

        $resource->delete();

        return response()->json(null, HttpCodes::OK);
    }

    /**
     * Retourne toutes les ressources d'un utilisateur
     * 
     * @see \Tests\Feature\ResourceController\ResourceControllerGetAllTest
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
     * @see \Tests\Feature\ResourceController\ResourceControllerHistoryTest
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
     * @see \Tests\Feature\ResourceController\ResourceControllerGenerateTest
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

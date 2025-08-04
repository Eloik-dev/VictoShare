<?php

namespace App\Http\Controllers;

use App\Constants\HttpCodes;
use App\Models\History;
use Illuminate\Http\JsonResponse;

/**
 * Contrôleur servant à la gestion des historiques de ressources
 */
class HistoryController extends Controller
{
    /**
     * Retourne l'historique d'utilisation d'une ressource
     * 
     * @see \Tests\Feature\HistoryController\HistoryControllerGetFromResourceTest
     * @param int $resourceId L'id de la ressource
     * @return JsonResponse
     */
    public function getForResource(int $resourceId): JsonResponse
    {
        $histories = History::with('user')->where('resource_id', $resourceId)->get();

        return response()->json(['histories' => $histories]);
    }

    /**
     * Supprime un historique par son id
     * 
     * @see \Tests\Feature\HistoryController\HistoryControllerDeleteTest
     * @param string $id L'id de l'historique
     * @return JsonResponse
     */
    public function delete(string $id): JsonResponse
    {
        $history = History::find($id);
        if (!$history) {
            return response()->json(null, HttpCodes::NOT_FOUND);
        }

        $history->delete();

        return response()->json(null, HttpCodes::OK);
    }
}

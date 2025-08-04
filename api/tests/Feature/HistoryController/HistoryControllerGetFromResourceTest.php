<?php

namespace Tests\Feature\ResourceController;

use App\Models\Resource;
use Illuminate\Testing\TestResponse;
use Laravel\Sanctum\Sanctum;
use Tests\Feature\HistoryControllerTestCase;

class HistoryControllerGetFromResourceTest extends HistoryControllerTestCase
{
    const HISTORY_LIMIT = 5;

    private Resource $resource;

    protected function setUp(): void
    {
        parent::setUp();

        Sanctum::actingAs($this->user, [], 'sanctum');

        $this->resource = $this->resourceFactory->create(['user_id' => $this->user->id]);

        $this->historyFactory->count(self::HISTORY_LIMIT)->create(['resource_id' => $this->resource->id]);
    }

    /**
     * Retourne l'historique d'utilisation d'une ressource
     * @param int $resourceId L'id de la ressource
     * @return TestResponse
     */
    public function getHistory(int $resourceId): TestResponse
    {
        return $this->get("/api/history/resource/$resourceId");
    }

    /**
     * Teste que la route retourne un 200
     */
    public function test_history_returns_a_200(): void
    {
        $response = $this->getHistory($this->resource->id);

        $response->assertOk();
    }

    /**
     * Teste que la route retourne le bon nombre de ressources
     */
    public function test_history_returns_correct_count(): void
    {
        $response = $this->getHistory($this->resource->id);

        $response->assertJsonCount(self::HISTORY_LIMIT, 'histories');
    }

    /**
     * Teste que la route retourne les ressources correctement formattées
     */
    public function test_history_returns_well_formatted_json(): void
    {
        $response = $this->getHistory($this->resource->id);

        $response->assertJsonStructure([
            'histories' => [
                '*' => [
                    'id',
                    'ip_address',
                    'user_agent',
                ]
            ]
        ]);
    }
    
    /**
     * Teste que l'accès à une ressource ajoute un historique
     */
    public function test_history_access_adds_history(): void
    {
        $this->get("/api/resource/access/{$this->resource->token}");
        
        $response = $this->getHistory($this->resource->id);
        $response->assertJsonCount(self::HISTORY_LIMIT + 1, 'histories');
    }
}

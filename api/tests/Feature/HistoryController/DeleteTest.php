<?php

namespace Tests\Feature\HistoryController;

use App\Models\History;
use App\Models\Resource;
use Illuminate\Testing\TestResponse;
use Laravel\Sanctum\Sanctum;
use Tests\Feature\HistoryControllerTestCase;

class DeleteTest extends HistoryControllerTestCase
{
    private Resource $resource;
    private History $history;

    protected function setUp(): void
    {
        parent::setUp();

        Sanctum::actingAs($this->user, [], 'sanctum');

        $this->resource = $this->resourceFactory->create(['user_id' => $this->user->id]);
        $this->history = $this->historyFactory->create(['resource_id' => $this->resource->id]);
    }

    /**
     * Supprime l'historique d'utilisation d'une ressource
     * @param int $historyId L'id de l'historique
     * @return TestResponse
     */
    public function deleteHistory(int $historyId): TestResponse
    {
        return $this->delete("/api/history/$historyId");
    }

    /**
     * Teste que la route retourne un 200
     */
    public function test_delete_history_returns_a_200(): void
    {
        $response = $this->deleteHistory($this->history->id);

        $response->assertOk();
    }

    /**
     * Teste que la route supprime l'historique d'utilisation d'une ressource
     */
    public function test_history_returns_correct_count(): void
    {
        $this->deleteHistory($this->history->id);

        $resource = Resource::find($this->resource->id);
        $histories = History::where('resource_id', $resource->id)->get();
        $this->assertCount(0, $histories);
    }
}

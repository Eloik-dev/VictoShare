<?php

namespace Tests\Feature\ResourceController;

use App\Models\User;
use Database\Factories\ResourceFactory;
use Illuminate\Testing\TestResponse;
use Laravel\Sanctum\Sanctum;
use Tests\Feature\ResourceControllerTestCase;

class ResourceControllerGetAllTest extends ResourceControllerTestCase
{
    private array $resources;

    protected function setUp(): void
    {
        parent::setUp();

        Sanctum::actingAs($this->user, [], 'sanctum');

        $this->resourceFactory = ResourceFactory::new();
        $this->resources = $this->resourceFactory->count(5)->create(['user_id' => $this->user->id])->toArray();
    }

    /**
     * Retourne les ressources d'un utilisateur connecté
     *
     * @return TestResponse
     */
    public function getResources(): TestResponse
    {
        return $this->get("/api/resource/all");
    }

    /**
     * Teste que la route retourne un 200
     */
    public function test_get_all_returns_a_200(): void
    {
        $response = $this->getResources();

        $response->assertOk();
    }

    /**
     * Teste que la route retourne le bon nombre de ressources
     */
    public function test_get_all_returns_correct_count(): void
    {
        $response = $this->getResources();

        $response->assertJsonCount(count($this->resources), 'resources');
    }

    /**
     * Teste que la route retourne seulement les ressources de l'utilisateur connecté
     */
    public function test_get_all_returns_only_current_user_resources(): void
    {
        $otherUser = User::factory()->create();
        $this->resourceFactory->count(5)->create(['user_id' => $otherUser->id]);

        $response = $this->getResources();
        $response->assertJsonCount(count($this->resources), 'resources');
    }
}

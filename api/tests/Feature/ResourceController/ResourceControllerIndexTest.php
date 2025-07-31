<?php

namespace Tests\Feature\ResourceController;

use Database\Factories\ResourceFactory;
use Illuminate\Testing\TestResponse;
use Tests\Feature\ResourceControllerTestCase;

class ResourceControllerIndexTest extends ResourceControllerTestCase
{
    protected function setUp(): void
    {
        parent::setUp();

        $this->resourceFactory = ResourceFactory::new();
    }

    /**
     * Accès à une ressource
     * @param string $token Le code d'accès de la ressource
     * @return TestResponse
     */
    public function getResource(string $token): TestResponse
    {
        return $this->get("/api/resource/$token");
    }

    /**
     * Teste l'accès à une ressource en fonction de son code d'accès
     */
    public function test_index_returns_a_200_if_resource_token_found(): void
    {
        $resource = $this->resourceFactory->create(['user_id' => $this->user->id]);
        $response = $this->getResource($resource->token);

        $response->assertOk();
    }

    /**
     * Teste qu'une ressource non trouvée renvoie un 404
     */
    public function test_index_returns_a_404_if_resource_token_not_found(): void
    {
        $response = $this->getResource('123456789');

        $response->assertNotFound();
    }

    /**
     * Teste qu'une ressource retournée de type lien est bien formattée
     */
    public function test_index_link_resource_returns_well_formatted_json(): void
    {
        $resource = $this->resourceFactory->link()->create(['user_id' => $this->user->id]);
        $response = $this->getResource($resource->token);

        $response->assertJson([
            'id' => $resource->id,
            'token' => $resource->token,
            'type' => $resource->type,
            'value' => parse_url($resource->value, PHP_URL_SCHEME) !== false ? $resource->value : null,
            'info' => null
        ]);
    }

    /**
     * Teste qu'une ressource retournée de type fichier est bien formattée
     */
    public function test_index_file_resource_returns_well_formatted_json(): void
    {
        $resource = $this->resourceFactory->file()->create(['user_id' => $this->user->id]);
        $response = $this->getResource($resource->token);

        $this->assertFileExists(storage_path("app/private/{$resource->value}"));

        $response->assertJson([
            'id' => $resource->id,
            'token' => $resource->token,
            'type' => $resource->type,
            'value' => $resource->value,
            'info' => $resource->getInfo()
        ]);
    }
}

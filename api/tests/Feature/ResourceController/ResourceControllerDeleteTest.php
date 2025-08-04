<?php

namespace Tests\Feature\ResourceController;

use Illuminate\Testing\TestResponse;
use Tests\Feature\ResourceControllerTestCase;

class ResourceControllerDeleteTest extends ResourceControllerTestCase
{
    protected function setUp(): void
    {
        parent::setUp();
    }

    /**
     * Supprime une ressource
     * @param string $id L'id de la ressource
     * @return TestResponse
     */
    public function deleteResource(int $id): TestResponse
    {
        return $this->delete("/api/resource/$id");
    }

    /**
     * Teste que le retour de la suppression d'une ressource est un 200
     */
    public function test_delete_resource_returns_a_200(): void
    {
        $resource = $this->resourceFactory->create(['user_id' => $this->user->id]);
        $this->deleteResource($resource->id)->assertOk();
    }
    
    /**
     * Teste que le retour de la suppression d'une ressource est un 200
     */
    public function test_delete_resource_returns_a_404_if_resource_not_found(): void
    {
        $this->deleteResource(9999999)->assertNotFound();
    }
}

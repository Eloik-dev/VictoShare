<?php

namespace Tests\Feature\ResourceController;

use Database\Factories\ResourceFactory;
use Illuminate\Http\UploadedFile;
use Illuminate\Testing\TestResponse;
use Tests\Feature\ResourceControllerTestCase;

class ResourceControllerGenerateTest extends ResourceControllerTestCase
{
    protected function setUp(): void
    {
        parent::setUp();

        $this->resourceFactory = ResourceFactory::new();
    }

    /**
     * Génère une ressource selon les entrées
     * Retourne toujours le code d'accès généré
     * 
     * @param array $data Les données de la requête
     * @return TestResponse
     */
    public function generate(array $data): TestResponse
    {
        return $this->post("/api/resource/generate", $data);
    }

    /**
     * Teste qu'une ressource retournée de type fichier est bien formattée
     */
    public function test_generate_returns_a_400_if_no_input(): void
    {
        $this->generate([])->assertBadRequest();
    }

    /**
     * Teste qu'une ressource générée de type lien retourne bien un code d'accès
     */
    public function test_generate_link_resource_returns_well_formatted_json(): void
    {
        $response = $this->generate(['link' => 'https://www.google.com/']);

        $response->assertOk();
        $response->assertJsonStructure(['token']);
    }

    /**
     * Teste qu'une ressource générée de type fichier retourne bien un code d'accès
     */
    public function test_generate_file_resource_returns_well_formatted_json(): void
    {
        $file = UploadedFile::fake()->create('test.txt', 100, 'text/plain');
        $response = $this->generate(['files' => [$file]]);

        $response->assertOk();
        $response->assertJsonStructure(['token']);
    }
}

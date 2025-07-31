<?php

namespace Tests\Feature\UserController;

use Illuminate\Testing\TestResponse;
use Tests\Feature\UserControllerTestCase;

class UserControllerIndexTest extends UserControllerTestCase
{
    protected function setUp(): void
    {
        parent::setUp();
    }

    /**
     * Retourne l'utilisateur connecté
     * @return TestResponse
     */
    public function getUser(): TestResponse
    {
        return $this->get("/api/auth");
    }

    /**
     * Teste que la route retourne un 200
     */
    public function test_index_returns_a_200(): void
    {
        $response = $this->getUser();
        $response->assertOk();
    }

    /**
     * Teste que la route retourne un 401 si l'utilisateur n'est pas authentifié
     */
    public function test_index_returns_401_if_not_authenticated(): void
    {
        $this->app['auth']->forgetGuards();

        $response = $this->getJson("/api/auth");
        $response->assertUnauthorized();
    }

    /**
     * Teste que la route retourne l'utilisateur correctement formatté
     */
    public function test_index_returns_well_formatted_json(): void
    {
        $response = $this->getUser();

        $response->assertJsonFragment([
            'id' => $this->user->id,
            'username' => $this->user->username,
            'email' => $this->user->email,
            'is_guest' => $this->user->is_guest,
            'guest_expires_at' => $this->user->guest_expires_at
        ]);
    }
}

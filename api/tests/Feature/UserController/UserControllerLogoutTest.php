<?php

namespace Tests\Feature\UserController;

use Illuminate\Testing\TestResponse;
use Tests\Feature\UserControllerTestCase;

class UserControllerLogoutTest extends UserControllerTestCase
{
    protected function setUp(): void
    {
        parent::setUp();
    }

    /**
     * Enregistre un utilisateur
     * @return TestResponse
     */
    public function logout(): TestResponse
    {
        return $this->get("/api/auth/logout");
    }

    /**
     * Teste que la route retourne un 200
     */
    public function test_logout_returns_a_200(): void
    {
        $response = $this->logout();
        $response->assertOk();
    }

    /**
     * Teste que la route retourne un 200
     */
    public function test_logout_deletes_session(): void
    {
        $this->logout();

        $this->assertGuest('web');
        $this->assertFalse(session()->has('_token'));
    }
}


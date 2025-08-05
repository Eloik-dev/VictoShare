<?php

namespace Tests\Feature\UserController;

use Illuminate\Testing\TestResponse;
use Tests\Feature\UserControllerTestCase;

class RegisterTest extends UserControllerTestCase
{
    protected function setUp(): void
    {
        parent::setUp();
    }

    /**
     * Enregistre un utilisateur
     * 
     * @param string $username
     * @param string $email
     * @param string $password
     * @return TestResponse
     */
    public function register(string $username, string $email, string $password = 'password'): TestResponse
    {
        return $this->post("/api/auth/register", [
            'username' => $username,
            'email' => $email,
            'password' => $password,
        ]);
    }

    /**
     * Teste que la route sauvegarde un utilisateur
     */
    public function test_register_returns_a_201(): void
    {
        $response = $this->register('username', 'bon_courriel@test.com');
        $response->assertCreated();
    }

    /**
     * Teste que la route retourne un 400 si l'email est mal formatté
     */
    public function test_register_returns_a_400_with_no_username(): void
    {
        $response = $this->register('', 'bon_courriel@test.com');
        $response->assertBadRequest();
    }

    /**
     * Teste que la route retourne un 400 si l'email est mal formatté
     */
    public function test_register_returns_a_400_with_no_email(): void
    {
        $response = $this->register('username', '');
        $response->assertBadRequest();
    }

    /**
     * Teste que la route retourne un 400 si l'email est mal formatté
     */
    public function test_register_returns_a_400_with_no_password(): void
    {
        $response = $this->register('username', 'bon_courriel@test.com', '');
        $response->assertBadRequest();
    }

    /**
     * Teste que la route retourne un 400 si l'email est mal formatté
     */
    public function test_register_returns_a_400_with_bad_email(): void
    {
        $response = $this->register('username', 'mauvais_courriel');
        $response->assertBadRequest();
    }

    /**
     * Teste que la route retourne un 400 si l'email est mal formatté
     */
    public function test_register_returns_a_400_with_bad_password(): void
    {
        $response = $this->register('username', 'bon_courriel@test.com', 'pass');
        $response->assertBadRequest();
    }
}
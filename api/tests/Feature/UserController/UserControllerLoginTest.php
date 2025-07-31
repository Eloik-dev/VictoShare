<?php

namespace Tests\Feature\UserController;

use App\Constants\HttpCodes;
use App\Models\User;
use Illuminate\Support\Str;
use Illuminate\Testing\TestResponse;
use Tests\Feature\UserControllerTestCase;

class UserControllerLoginTest extends UserControllerTestCase
{
    protected function setUp(): void
    {
        parent::setUp();
    }

    /**
     * Connecte un utilisateur
     * @return TestResponse
     */
    public function login(User $user): TestResponse
    {
        $this->app['auth']->forgetGuards();

        return $this->post("/api/auth/login", [
            'email' => $user->email,
            'password' => 'password',
        ]);
    }

    /**
     * Teste que la route retourne un 200
     */
    public function test_login_returns_a_200(): void
    {
        $response = $this->login($this->user);
        $response->assertOk();
    }

    /**
     * Teste que la connexion d'un utilisateur met en place une session
     */
    public function test_login_sets_session(): void
    {
        $user = $this->userFactory->create(['password' => 'password']);
        $response = $this->login($user);

        $response->assertJson([
            'status' => HttpCodes::OK,
            'user' => [
                'id' => $user->id,
                'username' => $user->username,
                'email' => $user->email
            ],
        ]);

        $this->assertAuthenticated('web');
        $this->assertTrue(session()->has('_token'));
    }

    /**
     * Teste que la route retourne un 200
     */
    public function test_login_as_guest_returns_a_200(): void
    {
        $this->app['auth']->forgetGuards();

        $guestCode = Str::random(26);
        $guestUser = $this->userFactory->guest($guestCode)->create();

        $response = $this->post("/api/auth/login", [
            'guestCode' => $guestCode,
        ]);

        $response->assertJson([
            'status' => HttpCodes::OK,
            'user' => [
                'id' => $guestUser->id,
                'username' => $guestUser->username,
                'email' => $guestUser->email
            ],
        ]);

        $this->assertAuthenticated('web');
        $this->assertTrue(session()->has('_token'));
    }

    /**
     * Teste que la route retourne un 401 si le compte temporaire n'existe pas
     */
    public function test_login_as_invalid_guest_returns_a_401(): void
    {
        $this->app['auth']->forgetGuards();

        $response = $this->post("/api/auth/login", ['guestCode' => 'invalid']);
        $response->assertUnauthorized();
    }
}
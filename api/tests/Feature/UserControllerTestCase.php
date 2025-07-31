<?php

namespace Tests\Feature;

use Database\Factories\UserFactory;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

abstract class UserControllerTestCase extends TestCase
{
    protected UserFactory $userFactory;

    /**
     * Configuration de l'environnement de test par défaut
     * @return void
     */
    protected function setUp(): void
    {
        parent::setUp();

        Sanctum::actingAs($this->user, [], 'sanctum');

        $this->userFactory = UserFactory::new();
    }
}

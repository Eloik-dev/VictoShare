<?php

namespace Tests\Feature;

use Database\Factories\HistoryFactory;
use Database\Factories\ResourceFactory;
use Tests\TestCase;

abstract class ResourceControllerTestCase extends TestCase
{
    protected ResourceFactory $resourceFactory;
    protected HistoryFactory $historyFactory;

    /**
     * Configuration de l'environnement de test par défaut
     * @return void
     */
    protected function setUp(): void
    {
        parent::setUp();

        $this->resourceFactory = ResourceFactory::new();
        $this->historyFactory = HistoryFactory::new();
    }
}

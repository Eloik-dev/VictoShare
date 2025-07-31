<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Resource>
 */
class ResourceFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => null,
            'token' => Str::random(26),
            'type' => false,
            'value' => $this->faker->url(),
        ];
    }

    /**
     * Génère une ressource de type fichier
     * @return ResourceFactory
     */
    public function file(): static
    {
        return $this->state(fn(array $attrs) => [
            'type' => true,
            'value' => Str::random(26) . '/test.txt',
        ])->afterCreating(function ($resource) {
            $content = $this->faker->text(100);

            $path = storage_path('app/private/' . $resource->value);
            $dir = dirname($path);
            if (!file_exists($dir)) {
                mkdir($dir, 0777, true);
            }
            
            file_put_contents($path, $content);
            $resource->save();
        });
    }

    /**
     * Génère une ressource de type lien
     * @return ResourceFactory
     */
    public function link(): static
    {
        return $this->state(fn(array $attrs) => [
            'type' => false,
            'value' => $this->faker->url(),
        ]);
    }
}


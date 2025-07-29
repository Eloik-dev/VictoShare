<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;
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
        $type = fake()->boolean();

        // Generate file with random content
        if ($type) {
            $fileContent = fake()->text(100);
            $filePath = storage_path("app/public/{$this->faker->unique()->sha1}.txt");
            file_put_contents($filePath, $fileContent);
        } else {
            $link = fake()->url();
        }

        return [
            'token' => Hash::make(Str::random(26)),
            'type' => $type,
            'value' => $type ? $filePath : $link,
        ];
    }
}

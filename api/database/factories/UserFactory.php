<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
 */
class UserFactory extends Factory
{
    /**
     * The current password being used by the factory.
     */
    protected static ?string $password;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'username' => fake()->name(),
            'email' => fake()->unique()->safeEmail(),
            'password' => static::$password ??= Hash::make('password'),
            'is_guest' => false,
            'guest_expires_at' => null
        ];
    }

    /**
     * Create a new guest user.
     * 
     * @return static
     */
    public function guest(string $guestCode = null): static
    {
        $guestCode ??= Str::random(26);

        return $this->state([
            'username' => 'Guest_' . $guestCode,
            'email' => "$guestCode@guest.com",
            'password' => $guestCode,
            'is_guest' => true,
            'guest_expires_at' => now()->addHours(2)
        ]);
    }
}

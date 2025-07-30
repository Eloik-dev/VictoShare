<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Prunable;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasApiTokens, HasFactory, Notifiable, Prunable;

    /**
     * Les attributs pouvant être affectés de manière massive.
     *
     * @var list<string>
     */
    protected $fillable = [
        'username',
        'email',
        'password',
        'is_guest',
        'guest_expires_at',
    ];

    /**
     * Les attributs exclus de la sérialisation.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password'
    ];

    /**
     * Les attributs qui doivent être mis en forme.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'password' => 'hashed',
        ];
    }

    /**
     * Retourne les utilisateurs dont les codes d'accès sont expirés.
     * Utilisé pour la suppression automatique des utilisateurs temporaires.
     * 
     * @return User
     */
    public function prunable()
    {
        return static::where('is_guest', true)
            ->where('guest_expires_at', '<=', now());
    }

    /**
     * La méthode "booted" du modèle.
     * S'occupe de supprimer toutes les ressources d'un utilisateur lorsqu'il est supprimé.
     *
     * @return void
     */
    protected static function booted()
    {
        static::deleting(function ($user) {
            $resources = Resource::where('user_id', $user->id)->get();
            foreach ($resources as $resource) {
                $resource->delete();
            }
        });
    }
}

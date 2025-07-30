<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;

/**
 * Modèle pour l'historique des ressources
 */
class History extends Model
{
    use HasFactory, Notifiable;

    /**
     * Les attributs pouvant être affectés de manière massive.
     *
     * @var string[]
     */
    protected $fillable = [
        'ip_address',
        'user_agent',
        'user_id',
        'resource_id',
    ];

    /**
     * Les attributs exclus de la sérialisation.
     *
     * @var list<string>
     */
    protected $hidden = [
        'user_id',
        'resource_id',
    ];

    /**
     * Effectue la liaison vers l'utilisateur ayant utilisé la ressource.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
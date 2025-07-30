<?php

namespace App\Models;

use App\Utils\FileUtils;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;

class Resource extends Model
{
    use HasFactory, Notifiable;

    public const LINK_TYPE = 0;
    public const FILE_TYPE = 1;

    /**
     * Les attributs pouvant être affectés de manière massive.
     *
     * @var string[]
     */
    protected $fillable = [
        'user_id',
        'token',
        'type',
        'value',
    ];

    /**
     * La méthode "booted" du modèle.
     * S'occupe de physiquement supprimer un fichier lorsque sa ressource est supprimé.
     * 
     * @return void
     */
    protected static function booted()
    {
        static::deleting(function ($resource) {
            if ($resource->type != Resource::FILE_TYPE) {
                return;
            }

            $filePath = storage_path("app/private/{$resource->value}");
            FileUtils::deleteDirectory(dirname($filePath));
        });
    }

    /**
     * Retourne les informations du fichier de la ressource s'il a lieu.
     * 
     * @return array{mimetype: string, name: string, size: bool|int|null}
     */
    public function getInfo()
    {
        if ($this->type == Resource::LINK_TYPE) {
            return [];
        }

        $path = storage_path("app/private/{$this->value}");
        $file = new \SplFileInfo($path);

        return [
            'name' => $file->getFilename(),
            'size' => $file->getSize(),
            'mimetype' => $file->getExtension()
        ];
    }
}


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
     * The attributes that are mass assignable.
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
     * The "booted" method of the model.
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

    public function getInfo()
    {
        if ($this->type == Resource::LINK_TYPE) {
            return null;
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


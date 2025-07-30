<?php

namespace App\Utils;

/**
 * Utilitaire pour manipuler les fichiers
 */
class FileUtils
{
    /**
     * Supprimer un dossier et ses fichiers
     * 
     * @link https://www.tutorialspoint.com/how-to-recursively-delete-a-directory-and-its-entire-contents-files-plus-sub-dirs-in-php
     * @param string $dirPath
     * @return void
     */
    static function deleteDirectory(string $dirPath)
    {
        if (is_dir($dirPath)) {
            $files = scandir($dirPath);
            foreach ($files as $file) {
                if ($file !== '.' && $file !== '..') {
                    $filePath = $dirPath . '/' . $file;
                    if (is_dir($filePath)) {
                        rmdir($filePath);
                    } else {
                        unlink($filePath);
                    }
                }
            }
            rmdir($dirPath);
        }
    }
}
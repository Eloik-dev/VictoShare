<?php

namespace Tests\Unit;

use App\Utils\FileUtils;
use Illuminate\Support\Facades\File;
use Faker\Factory as FakerFactory;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class FileUtilsTest extends TestCase
{
    use RefreshDatabase;

    /**
     * Teste la suppression d'un dossier à l'aide de FileUtils
     */
    public function test_delete_dir(): void
    {
        $faker = FakerFactory::create();
        $randomContent = $faker->text();

        $filePath = sys_get_temp_dir() . '/' . $faker->word . '/' . $faker->word . '.txt';
        if (!file_exists(dirname($filePath))) {
            mkdir(dirname($filePath), 0777, true);
        }

        File::put($filePath, $randomContent);
        $this->assertFileExists($filePath);

        FileUtils::deleteDirectory(dirname($filePath));
        $this->assertFileDoesNotExist($filePath);
    }
}


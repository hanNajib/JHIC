<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Filesystem\Filesystem;

class MakeTraitCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'make:trait {name : The name of the trait}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Create a new trait class';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $name = $this->argument('name');
        $filesystem = new Filesystem();

        $path = app_path("Traits/{$name}.php");

        if ($filesystem->exists($path)) {
            $this->error("Trait {$name} already exists!");
            return;
        }

        $stub = <<<PHP
        <?php

        namespace App\Traits;

        trait {$name}
        {
            //
        }
        PHP;

        $filesystem->ensureDirectoryExists(app_path('Traits'));
        $filesystem->put($path, $stub);

        $this->info("Trait {$name} created successfully at App/Traits/{$name}.php");
    }
}

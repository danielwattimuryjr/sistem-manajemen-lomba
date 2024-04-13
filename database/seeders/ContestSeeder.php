<?php

namespace Database\Seeders;

use App\Models\Contest;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ContestSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $this->command->info("Creating 30 Dummy Contest");

        for ($i = 0; $i < 30; $i++) {
            Contest::factory()->create([
                'title' => "Contest Dummy #$i",
                'slug' => "contest-dummy-$i"
            ]);
        }

    }
}

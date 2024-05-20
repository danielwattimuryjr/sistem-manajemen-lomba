<?php

namespace Database\Seeders;

use App\Models\Contest;
use App\Models\Role;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ContestSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $perangkat_daerah = Role::where('name', 'PERANGKAT_DAERAH')->firstOrFail()->id;
        $guru = Role::where('name', 'GURU')->firstOrFail()->id;
        $umum = Role::where('name', 'UMUM')->firstOrFail()->id;
        $sma_smk = Role::where('name', 'SMA/SMK')->firstOrFail()->id;
        $smp = Role::where('name', 'SMP')->firstOrFail()->id;

        $this->command->info("Creating Contest  : Lomba Debat");
        Contest::factory()->create([
            'title' => "Lomba Debat",
            'slug' => "lomba-debat"
        ])->roles()->attach([$perangkat_daerah, $guru]);

        $this->command->info("Creating Contest  : Lomba Vokal Group");
        Contest::factory()->create([
            'title' => "Lomba Vokal Group",
            'slug' => "lomba-vokal-group"
        ])->roles()->attach([$sma_smk, $smp]);

        $this->command->info("Creating Contest  : Lomba Story Telling");
        Contest::factory()->create([
            'title' => "Lomba Story Telling",
            'slug' => "lomba-story-telling"
        ])->roles()->attach([$sma_smk, $smp]);

        $this->command->info("Creating Contest  : Lomba Guiding");
        Contest::factory()->create([
            'title' => "Lomba Guiding",
            'slug' => "lomba-guiding"
        ])->roles()->attach([$umum]);

        $this->command->info("Creating Contest  : Lomba Wide Game");
        Contest::factory()->create([
            'title' => "Lomba Wide Game",
            'slug' => "lomba-wide-game"
        ])->roles()->attach([$sma_smk, $smp]);

        $this->command->info("Creating Contest  : Lomba Cerdas Cermat");
        Contest::factory()->create([
            'title' => "Lomba Cerdas Cermat",
            'slug' => "lomba-cerdas-cermat"
        ])->roles()->attach([$perangkat_daerah, $sma_smk, $smp]);
    }
}

<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $this->command->info("Creating SUPERADMIN user");
        \App\Models\User::factory()->create([
            'full_name' => 'Superadmin',
            'email' => 'SUPERADMIN@app.com',
        ])->addRole('SUPERADMIN');

        $this->command->info("Creating ADMIN user");
        \App\Models\User::factory()->create([
            'full_name' => 'Admin',
            'email' => 'ADMIN@app.com',
        ])->addRole('ADMIN');

        $this->command->info("Creating GUEST user");
        \App\Models\User::factory()->create([
            'email' => 'GUEST@app.com',
            'nik' => '31247189412794',
            'full_name' => 'Test User',
            'd_o_b' => '03 October 2024',
            'address' => 'Jakarta',
            'phone_number' => '09999999',
            'gender' => \App\Enum\GenderEnum::MALE
        ])->addRole('GUEST');

        $this->command->info("Creating PERANGKAT_DAERAH user");
        \App\Models\User::factory()->create([
            'full_name' => 'Perangkat Daerah',
            'email' => 'PERANGKAT_DAERAH@app.com',
        ])->addRole('PERANGKAT_DAERAH');

        $this->command->info("Creating GURU user");
        \App\Models\User::factory()->create([
            'full_name' => 'Guru',
            'email' => 'GURU@app.com',
        ])->addRole('GURU');

        $this->command->info("Creating GURU user");
        \App\Models\User::factory()->create([
            'full_name' => 'Guru',
            'email' => 'GURU@app.com',
        ])->addRole('GURU');
    }
}

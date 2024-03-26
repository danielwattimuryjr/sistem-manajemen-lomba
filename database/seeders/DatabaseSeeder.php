<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();
        $this->call(LaratrustSeeder::class);

        User::factory()->create([
            'name' => 'Test Guest',
            'email' => 'guest@mail.com',
        ])->addRole('GUEST');

        User::factory()->create([
            'name' => 'Test Admin',
            'email' => 'admin@mail.com',
        ])->addRole('ADMIN');
    }
}

<?php

namespace Database\Seeders;

use App\Models\Level;
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

    User::factory()->create([
      'name' => 'Superadmin',
      'email' => 'superadmin@app.com',
      'role' => 'superadmin'
    ]);

    User::factory()->create([
      'name' => 'Admin',
      'email' => 'admin@app.com',
      'role' => 'admin'
    ]);
    User::factory()->create([
      'name' => 'Juri 1',
      'email' => 'juri.1@app.com',
      'role' => 'admin'
    ]);
    User::factory()->create([
      'name' => 'Juri 2',
      'email' => 'juri.2@app.com',
      'role' => 'admin'
    ]);
    User::factory()->create([
      'name' => 'Juri 3',
      'email' => 'juri.3@app.com',
      'role' => 'admin'
    ]);

    User::factory()->create([
      'name' => 'Guest',
      'email' => 'guest@app.com',
      'role' => 'guest'
    ]);

    User::factory(10)->create([
      'role' => 'guest'
    ]);

    $this->call([CompetitionSeeder::class]);
  }
}

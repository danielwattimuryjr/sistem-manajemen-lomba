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
    $this->call([CompetitionSeeder::class]);

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

    User::factory(10)->create([
      'role' => 'guest'
    ]);
  }
}

<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Competition>
 */
class CompetitionFactory extends Factory
{
  /**
   * Define the model's default state.
   *
   * @return array<string, mixed>
   */
  public function definition(): array
  {
    $name = $this->faker->unique()->words(3, true);
    return [
      'name' => $name,
      'slug' => Str::slug($name),
      'description' => $this->faker->paragraph(3),
      'start_date' => $this->faker->dateTimeBetween('now', '+1 month'),
      'end_date' => $this->faker->dateTimeBetween('+1 month', '+2 months'),
      'is_active' => $this->faker->boolean,
    ];
  }
}

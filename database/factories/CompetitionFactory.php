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
      'user_id' => $this->faker->numberBetween(2, 5),
      'slug' => Str::slug($name, '_'),
      'description' => '<h1 class="text-xl font-bold" level="1">Lorem Ipsum</h1><p></p><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse arcu dolor, faucibus vitae faucibus egestas, ultricies non lectus. Etiam aliquam posuere nulla et imperdiet. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nam elementum, neque vel egestas accumsan, neque lorem tincidunt nibh, ac consectetur elit nulla sed dui. Mauris mattis augue venenatis iaculis scelerisque. Mauris non mauris tellus. Suspendisse non nibh aliquet dui faucibus venenatis vitae a justo.</p><p></p><p><strong>Curabitur et purus neque. Curabitur.</strong></p><ul class="list-disc pl-4"><li><p>Quisque vitae nulla eu nisi lobortis placerat.</p></li><li><p>Maecenas nec est ac odio porta viverra.</p></li><li><p>Suspendisse vel ipsum gravida, cursus ligula ac, luctus ex.</p></li><li><p>Nulla aliquet eros ut augue facilisis lobortis.</p></li></ul><p></p><p></p><p><strong>Ut facilisis elit leo, eget.</strong></p><ol class="list-decimal pl-8"><li><p>Donec suscipit lectus ac mauris tempor condimentum nec at velit.</p></li><li><p>Vivamus fringilla mauris a dui gravida, id luctus ex tincidunt.</p></li><li><p>Aenean laoreet neque porttitor arcu ultricies dignissim.</p></li><li><p>Sed sed orci vel risus rhoncus auctor.</p></li></ol>',
      'start_date' => $this->faker->dateTimeBetween('now', '+1 month'),
      'end_date' => $this->faker->dateTimeBetween('+1 month', '+2 months'),
      'is_active' => $this->faker->boolean,
    ];
  }
}

<?php

namespace Database\Factories;

use App\Models\User;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Contest>
 */
class ContestFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $start_date = Carbon::now()->subYear()->addDays(rand(0, 364))->format('d F Y');

        $random_days = mt_rand(1, 100); // Generate a random number between 1 and 10 for the duration

        $end_date = Carbon::parse($start_date)->addDays($random_days)->format('d F Y');

        return [
            'description' => '<p><u>Nunc porta, orci in suscipit aliquet, augue ex porttitor nulla, sit amet ullamcorper enim ligula ac</u> augue. Ut ut felis eu orci tristique venena<em>tis eget sit amet sapien. Aliquam efficitu</em>r commodo ligula, a pulvinar felis hendrerit nec. <strong>Suspendisse potenti. Vivamus eleifend tellus vita</strong>e diam bibendum, et consectetur magna finibus.<s> Nam at ipsum pulvinar, fermentum sapien eget, lacinia magna. </s></p><p></p><h1 class="text-xl font-bold" level="1">Unordered List :</h1><ul class="list-disc pl-4"><li><p>Aliquam at diam at tortor condimentum dignissim.</p></li><li><p>Curabitur ut augue non felis placerat interdum.</p></li><li><p>Aenean sodales tortor eu nulla ornare interdum.</p></li></ul><p></p><h1 class="text-xl font-bold" level="1">Ordered List :</h1><ol class="list-decimal pl-8"><li><p>Nulla convallis mi bibendum quam lacinia tincidunt.</p></li><li><p>Integer nec diam vitae arcu posuere cursus ut eget lorem.</p></li><li><p>Nunc quis lorem eget tellus rutrum facilisis.</p></li><li><p>Morbi tempus quam quis odio gravida venenatis.</p></li></ol>',
            'start_date' => $start_date,
            'end_date' => $end_date,
            'isActive' => fake()->boolean(),
            'created_by' => User::whereHasRole(['ADMIN', 'SUPERADMIN'])->inRandomOrder()->first()->id,
        ];
    }
}

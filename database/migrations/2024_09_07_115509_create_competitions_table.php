<?php

use App\Models\User;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
  /**
   * Run the migrations.
   */
  public function up(): void
  {
    Schema::create('competitions', function (Blueprint $table) {
      $table->id();
      $table->foreignIdFor(User::class)->nullable()->constrained()->nullOnDelete();
      $table->string('name');
      $table->string('slug')->unique();
      $table->longText('description');
      $table->timestamp('start_date')->nullable();
      $table->timestamp('end_date')->nullable();
      $table->boolean('is_active');
      $table->boolean('has_final_scores')->default(false);
      $table->timestamps();
    });
  }

  /**
   * Reverse the migrations.
   */
  public function down(): void
  {
    Schema::dropIfExists('competitions');
  }
};

<?php

use App\Models\Competition;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
  /**
   * Run the migrations.
   */
  public function up(): void
  {
    Schema::create('criterias', function (Blueprint $table) {
      $table->id();
      $table->foreignIdFor(Competition::class)->constrained()->cascadeOnDelete();
      $table->string('name');
      $table->integer('weight');
      $table->timestamps();
    });
  }

  /**
   * Reverse the migrations.
   */
  public function down(): void
  {
    Schema::dropIfExists('criterias');
  }
};

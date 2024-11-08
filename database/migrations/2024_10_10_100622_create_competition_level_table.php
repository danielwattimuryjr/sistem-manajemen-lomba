<?php

use App\Models\Competition;
use App\Models\Level;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
  /**
   * Run the migrations.
   */
  public function up(): void
  {
    Schema::create('competition_level', function (Blueprint $table) {
      $table->foreignIdFor(Competition::class)->constrained()->cascadeOnDelete();
      $table->foreignIdFor(Level::class)->constrained()->cascadeOnDelete();
    });
  }

  /**
   * Reverse the migrations.
   */
  public function down(): void
  {
    Schema::dropIfExists('competition_level');
  }
};

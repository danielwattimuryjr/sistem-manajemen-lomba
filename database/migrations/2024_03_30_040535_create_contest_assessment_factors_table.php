<?php

use App\Models\Contest;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('contest_assessment_factors', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(Contest::class)->constrained()->cascadeOnDelete();
            $table->string('nama_faktor');
            $table->tinyInteger('bobot_penilaian');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('contest_assessment_factors');
    }
};

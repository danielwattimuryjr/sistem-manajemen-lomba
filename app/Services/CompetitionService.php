<?php

namespace App\Services;

use App\Models\Competition;
use App\Traits\SAWCalculator;

class CompetitionService
{
  use SAWCalculator;

  public function calculateAndSaveScores(Competition $competition)
  {
    return $this->processSAW($competition->id);
  }
}

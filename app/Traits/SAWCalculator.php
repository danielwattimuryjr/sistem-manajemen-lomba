<?php

namespace App\Traits;

use App\Models\FinalScore;
use Illuminate\Support\Facades\DB;

trait SAWCalculator
{
  /**
   * Ambil data kriteria beserta bobot untuk sebuah kompetisi.
   *
   * @param int $competitionId
   * @return \Illuminate\Support\Collection
   */
  private function getCriterias(int $competitionId)
  {
    return DB::table('criterias')
      ->where('competition_id', $competitionId)
      ->get(['id', 'weight']);
  }

  /**
   * Ambil data skor peserta berdasarkan kriteria dalam sebuah kompetisi.
   *
   * @param int $competitionId
   * @return \Illuminate\Support\Collection
   */
  private function getScores(int $competitionId)
  {
    return DB::table('score_entries')
      ->join('participants', 'score_entries.participant_id', '=', 'participants.id')
      ->where('participants.competition_id', $competitionId)
      ->select('score_entries.participant_id', 'score_entries.criteria_id', 'score_entries.score')
      ->get();
  }

  /**
   * Normalisasi skor berdasarkan kriteria dengan asumsi semua kriteria adalah benefit.
   *
   * @param \Illuminate\Support\Collection $scores
   * @param \Illuminate\Support\Collection $criterias
   * @return array Normalized scores [participant_id => [criteria_id => normalized_score]]
   */
  private function normalizeScores($scores, $criterias)
  {
    $normalizedScores = [];

    foreach ($criterias as $criteria) {
      $criteriaScores = $scores->where('criteria_id', $criteria->id);
      $maxScore = $criteriaScores->max('score'); // Cari nilai maksimum

      foreach ($criteriaScores as $score) {
        $normalizedScores[$score->participant_id][$criteria->id] = $score->score / $maxScore;
      }
    }

    return $normalizedScores;
  }

  /**
   * Hitung total skor peserta berdasarkan nilai yang di-normalisasi dan bobot kriteria.
   *
   * @param array $normalizedScores
   * @param \Illuminate\Support\Collection $criterias
   * @return array Total scores [participant_id => total_score]
   */
  private function calculateTotalScores(array $normalizedScores, $criterias)
  {
    $totalScores = [];

    foreach ($normalizedScores as $participantId => $scores) {
      $totalScore = 0;

      foreach ($scores as $criteriaId => $normalizedScore) {
        $weight = $criterias->where('id', $criteriaId)->first()->weight;
        $totalScore += $normalizedScore * $weight;
      }

      $totalScores[$participantId] = $totalScore;
    }

    return $totalScores;
  }

  /**
   * Simpan hasil akhir ke tabel final_scores.
   *
   * @param array $totalScores
   * @return void
   */
  private function saveFinalScores(array $totalScores)
  {
    arsort($totalScores);

    $rank = 1;
    foreach ($totalScores as $participantId => $totalScore) {
      FinalScore::updateOrCreate(
        ['participant_id' => $participantId],
        ['total_score' => $totalScore, 'rank' => $rank++]
      );
    }
  }

  /**
   * Proses lengkap perhitungan SAW dan penyimpanan hasil.
   *
   * @param int $competitionId
   * @return array Hasil perhitungan dengan rank
   */
  public function processSAW(int $competitionId)
  {
    $criterias = $this->getCriterias($competitionId);
    if ($criterias->isEmpty()) {
      throw new \Exception('Tidak ada kriteria untuk kompetisi ini.');
    }

    $scores = $this->getScores($competitionId);
    if ($scores->isEmpty()) {
      throw new \Exception('Tidak ada skor yang ditemukan untuk kompetisi ini.');
    }

    $normalizedScores = $this->normalizeScores($scores, $criterias);
    $totalScores = $this->calculateTotalScores($normalizedScores, $criterias);

    $this->saveFinalScores($totalScores);

    return $this->formatResults($totalScores);
  }

  /**
   * Format hasil SAW untuk output.
   *
   * @param array $totalScores
   * @return array
   */
  private function formatResults(array $totalScores)
  {
    $results = [];
    $rank = 1;

    foreach ($totalScores as $participantId => $totalScore) {
      $results[] = [
        'participant_id' => $participantId,
        'total_score'    => $totalScore,
        'rank'           => $rank++,
      ];
    }

    return $results;
  }
}

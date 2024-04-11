<?php

namespace App\Rules;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

class EndDateAfterOrEqualStartDate implements ValidationRule
{
    private $startDate;

    public function __construct($startDate)
    {
        $this->startDate = $startDate;
    }

    /**
     * Run the validation rule.
     *
     * @param  \Closure(string): \Illuminate\Translation\PotentiallyTranslatedString  $fail
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        if (date_create_from_format('d F Y', $value) < date_create_from_format('d F Y', $this->startDate)) {
            $fail('Tanggal selesai acara tidak boleh sebelum tanggal mulai');
        }
    }
}

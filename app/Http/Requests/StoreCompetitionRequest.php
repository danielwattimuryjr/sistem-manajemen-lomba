<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;

class StoreCompetitionRequest extends FormRequest
{
  /**
   * Determine if the user is authorized to make this request.
   */
  public function authorize(): bool
  {
    $user = Auth::user();

    if ($user->hasRole(['superadmin', 'admin'])) {
      return true;
    }
    return false;
  }

  /**
   * Get the validation rules that apply to the request.
   *
   * @return array<string, ValidationRule|array<mixed>|string>
   */
  public function rules(): array
  {
    return [
      'name' => [
        'required',
        'string',
        'min:3'
      ],
      'user_id' => [
        'required',
        Rule::exists('users', 'id')
      ],
      'slug' => [
        'required',
        'string',
        'min:3',
        Rule::unique('competitions', 'slug')
      ],
      'description' => [
        'required',
      ],
      'start_date' => [
        'required',
        'date'
      ],
      'end_date' => [
        'required',
        'date'
      ],
      'assessment_factors' => [
        'required',
        'array'
      ],
      'assessment_factors.*.name' => [
        'required',
        'string'
      ],
      'assessment_factors.*.weight' => [
        'required',
        'integer',
      ],
      'levels' => [
        'required',
        'array'
      ],
      'levels.*' => [
        'integer',
        Rule::exists('levels', 'id')
      ],
    ];
  }
}

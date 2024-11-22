<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;

class UpdateLevelRequest extends FormRequest
{
  /**
   * Determine if the user is authorized to make this request.
   */
  public function authorize(): bool
  {
    $user = Auth::user();

    if ($user->hasRole('superadmin'))
      return true;

    return false;
  }

  /**
   * Get the validation rules that apply to the request.
   *
   * @return array<string, ValidationRule|array<mixed>|string>
   */
  public function rules(): array
  {
    $level = $this->route('level');

    return [
      'name' => [
        'required',
        'string',
      ],
      'slug' => [
        'required',
        'string',
        Rule::unique('levels')->ignore($level)
      ]
    ];
  }
}

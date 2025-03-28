<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rules;
use Illuminate\Validation\Rule;

class StoreUserRequest extends FormRequest
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
    return [
      'name' => [
        'required',
      ],
      'password' => [
        'required',
        Rules\Password::defaults()
      ],
      'username' => [
        'required',
        Rule::unique('users', 'username')
      ],
      'role' => [
        'required',
        Rule::in(['admin', 'participants', 'judges'])
      ],
      'phone_number' => [
        'required',
        'numeric',
        'min_digits:10',
        'max_digits:12',
      ],
      'address' => [
        'required'
      ],
      'nik' => [
        'required',
        'numeric',
        'digits:16',
        Rule::unique('users', 'nik')
      ],
      'date_of_birth' => [
        'required',
        'date'
      ],
      'level_id' => [
        'required_if:role,participants',
        Rule::exists('levels', 'id')
      ],
      'email' => [
        'required',
        'email',
        Rule::unique('users', 'email')
      ],
    ];
  }
}

<?php

namespace App\Http\Requests;

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
   * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
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
        Rule::in(['admin', 'guest'])
      ],
      'phone_number' => [
        'required',
        'digits:10'
      ],
      'address' => [
        'required'
      ],
      'nik' => [
        'required',
        'digits:16',
        Rule::unique('users', 'nik')
      ],
      'date_of_birth' => [
        'required',
        'date'
      ],
      'level_id' => [
        'required_if:role,guest',
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

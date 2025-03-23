<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rules;
use Illuminate\Validation\Rule;

class UpdateUserRequest extends FormRequest
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
    $user = $this->route('user');

    return [
      'name' => [
        'required',
      ],
      'username' => [
        'required',
        Rule::unique('users', 'username')->ignore($user)
      ],
      'role' => [
        'required',
        Rule::in(['admin', 'guest'])
      ],
      'phone_number' => [
        'required',
        'numeric',
        'min_digits:10',
        'max_digits:12'
      ],
      'address' => [
        'required'
      ],
      'nik' => [
        'required',
        'numeric',
        'digits:16',
        Rule::unique('users', 'nik')->ignore($user)
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
        'string',
        'lowercase',
        'email',
        Rule::unique('users', 'email')->ignore($user)
      ],
    ];
  }
}

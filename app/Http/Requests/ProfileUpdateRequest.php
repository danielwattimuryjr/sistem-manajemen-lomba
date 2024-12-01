<?php

namespace App\Http\Requests;

use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ProfileUpdateRequest extends FormRequest
{
  /**
   * Get the validation rules that apply to the request.
   *
   * @return array<string, \Illuminate\Contracts\Validation\Rule|array|string>
   */
  public function rules(): array
  {
    return [

      'username' => [
        'required',
        Rule::unique('users', 'username')->ignore($this->user()->id)
      ],
      'name' => [
        'required',
        'string',
        'max:255'
      ],
      'email' => [
        'required',
        'string',
        'lowercase',
        'email',
        'max:255',
        Rule::unique(User::class)->ignore($this->user()->id)
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
        Rule::unique('users', 'nik')->ignore($this->user()->id)
      ],
      'date_of_birth' => [
        'required',
        'date'
      ],
    ];
  }
}

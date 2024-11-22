<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;

class StoreScoreEntryRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
      $user = Auth::user();

      if ($user->hasRole(['superadmin', 'admin']))
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
            'criterias' => [
              'required',
              'min:1',
              'array'
            ],
            'criterias.*.name' => [
              'required',
              'string'
            ],
            'criterias.*.id' => [
              'required',
              Rule::exists('criterias', 'id')
            ],
            'criterias.*.score' => [
              'required',
              'numeric',
              'min:1',
              'max:100'
            ],
        ];
    }
}

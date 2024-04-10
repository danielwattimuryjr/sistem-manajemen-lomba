<?php

namespace App\Http\Requests;

use App\Enum\GenderEnum;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreSignUpSecondtStepRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        $user = auth()->user();

        if ($user) return false;

        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $genderValues = array_map(function (GenderEnum $gender) {
            return $gender->value;
        }, GenderEnum::cases());

        return [
            'full_name'     => 'required',
            'nik'           => [
                'required',
                'numeric',
                Rule::unique('users','nik')
            ],
            'd_o_b'           => 'required|date_format:d F Y',
            'address'       => 'required',
            'phone_number'  => 'required',
            'gender' => 'required|in:' . implode(',', $genderValues),
        ];
    }
}

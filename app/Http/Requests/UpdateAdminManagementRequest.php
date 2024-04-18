<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Password;
use Illuminate\Validation\Rule;

class UpdateAdminManagementRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        $user = auth()->user();

        if ($user && $user->hasRole('SUPERADMIN')) {
            return true;
        }

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
            'full_name' => 'required|string|max:255',
            'email' => [
                'required',
                'string',
                'email',
                'max:255',
                Rule::unique('users')->ignore($this->user->id),
            ],
            'password' => [
                'sometimes',
                'confirmed',
            ],
        ];
    }

    public function messages(): array
    {
        return [
            'full_name.required' => 'Nama lengkap harus diisi.',
            'full_name.string' => 'Nama lengkap hanya boleh terdiri dari huruf dan spasi.',
            'full_name.max' => 'Panjang nama lengkap tidak boleh lebih dari 255 huruf.',
            'email.required' => 'Alamat email harus diisi.',
            'email.string' => 'Alamat email hanya boleh terdiri dari huruf, angka, dan karakter khusus seperti @ dan titik.',
            'email.email' => 'Format alamat email tidak valid. Contoh format email yang benar: namaanda@email.com',
            'email.max' => 'Panjang alamat email tidak boleh lebih dari 255 huruf.',
            'email.unique' => 'Alamat email tersebut sudah terdaftar sebelumnya.',
        ];
    }
}

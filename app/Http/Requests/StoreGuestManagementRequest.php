<?php

namespace App\Http\Requests;

use App\Enum\GenderEnum;
use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules;

class StoreGuestManagementRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        $user = auth()->user();

        if ($user && $user->hasRole(['ADMIN', 'SUPERADMIN'])) {
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
        $genderValues = array_map(function (GenderEnum $gender) {
            return $gender->value;
        }, GenderEnum::cases());

        return [
            'email' => 'required|string|lowercase|email|max:255|unique:' . User::class,
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
            'full_name' => [
                'required',
                'string',
                'max:255',
            ],
            'nik' => [
                'required',
                'numeric',
                'digits:16', // Asumsi NIK memiliki 16 digit angka
                Rule::unique('users', 'nik'),
            ],
            'd_o_b' => [
                'required',
                'date_format:d F Y',
                'before:today', // Untuk memastikan tanggal lahir tidak di masa depan
            ],
            'address' => [
                'required',
                'string',
                'max:500', // Asumsi panjang maksimum alamat adalah 500 karakter
            ],
            'phone_number' => [
                'required',
                'numeric',
                'digits_between:10,13', // Asumsi nomor telepon memiliki panjang antara 10-13 digit angka
            ],
            'gender' => [
                'required',
                'in:' . implode(',', $genderValues),
            ],
        ];
    }

    public function messages()
    {
        return [
            'email.required' => 'Kolom email harus diisi.',
            'email.string' => 'Kolom email harus berupa teks.',
            'email.email' => 'Format email tidak valid.',
            'email.max' => 'Kolom email tidak boleh lebih dari 255 karakter.',
            'email.unique' => 'Email sudah digunakan.',

            'password.required' => 'Kolom password harus diisi.',
            'password.string' => 'Kolom password harus berupa teks.',
            'password.min' => 'Password minimal :min karakter.',
            'password.confirmed' => 'Konfirmasi password tidak cocok.',

            'full_name.required' => 'Nama lengkap harus diisi.',
            'full_name.string' => 'Nama lengkap hanya boleh terdiri dari huruf dan spasi.',
            'full_name.max' => 'Panjang nama lengkap tidak boleh lebih dari 255 huruf.',
            'nik.required' => 'Nomor Induk Kependudukan (NIK) harus diisi.',
            'nik.numeric' => 'Nomor Induk Kependudukan (NIK) hanya boleh terdiri dari angka.',
            'nik.digits' => 'Nomor Induk Kependudukan (NIK) harus terdiri dari 16 angka.',
            'nik.unique' => 'Nomor Induk Kependudukan (NIK) sudah terdaftar sebelumnya.',
            'd_o_b.required' => 'Tanggal lahir harus diisi.',
            'd_o_b.date_format' => 'Format tanggal lahir harus ditulis seperti ini: 01 Januari 1990.',
            'd_o_b.before' => 'Tanggal lahir tidak boleh di masa depan.',
            'address.required' => 'Alamat harus diisi.',
            'address.string' => 'Alamat hanya boleh terdiri dari huruf, angka, spasi, dan tanda baca seperti koma atau titik.',
            'address.max' => 'Panjang alamat tidak boleh lebih dari 500 huruf.',
            'phone_number.required' => 'Nomor telepon harus diisi.',
            'phone_number.numeric' => 'Nomor telepon hanya boleh terdiri dari angka.',
            'phone_number.digits_between' => 'Nomor telepon harus terdiri dari 10 sampai 13 angka.',
            'gender.required' => 'Jenis kelamin harus diisi.',
            'gender.in' => 'Jenis kelamin yang dipilih tidak valid.',
        ];
    }
}

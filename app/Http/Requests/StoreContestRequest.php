<?php

namespace App\Http\Requests;

use App\Models\Role;
use App\Rules\EndDateAfterOrEqualStartDate;
use Illuminate\Foundation\Http\FormRequest;

class StoreContestRequest extends FormRequest
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
        $availableRoles = Role::whereNotIn('name', ['SUPERADMIN', 'ADMIN'])->pluck('id')->toArray();

        return [
            'title' => 'required|string|unique:contests,title',
            'description' => 'required',
            'start_date' => 'required|date_format:d F Y',
            'end_date' => ['required', 'date_format:d F Y', new EndDateAfterOrEqualStartDate($this->input('start_date'))],
            'slug' => 'required|unique:contests,slug',
            'form_penilaian' => 'required',
            'form_penilaian.*.nama_faktor' => 'required',
            'form_penilaian.*.bobot_penilaian' => 'required|numeric|min:1',
            'role_id' => [
                'required',
                'array',
                'in:' . implode(',', $availableRoles),
            ]
        ];
    }

    public function messages(): array
    {
        return [
            'title.required' => 'Judul acara harus diisi',
            'title.string' => 'Judul acara harus berupa teks',
            'title.unique' => 'Judul perlombaan sudah digunakan sebelumnya. Harap pilih judul yang berbeda.',
            'description.required' => 'Deskripsi acara harus diisi',
            'description.string' => 'Deskripsi acara harus berupa teks',
            'start_date.required' => 'Tanggal mulai acara harus diisi',
            'start_date.date_format' => 'Tanggal mulai acara harus ditulis dengan format "10 Maret 2023"',
            'end_date.required' => 'Tanggal selesai acara harus diisi',
            'end_date.date_format' => 'Tanggal selesai acara harus ditulis dengan format "10 Maret 2023"',
            'required' => ':attribute wajib diisi.',
            'string' => ':attribute harus berupa teks.',
            'date_format' => ':attribute harus ditulis dengan format "10 Maret 2023".',
        ];
    }
}

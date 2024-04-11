<?php

namespace App\Http\Requests;

use App\Rules\EndDateAfterOrEqualStartDate;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateContestRequest extends FormRequest
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
        return [
            'title' => [
                'required',
                'string',
                Rule::unique('contests', 'title')->ignore($this->contest)
            ],
            'description' => 'required',
            'start_date' => 'required|date_format:d F Y',
            'end_date' => ['required', 'date_format:d F Y', new EndDateAfterOrEqualStartDate($this->input('start_date'))],
            'slug' => [
                'required',
                Rule::unique('contests', 'slug')->ignore($this->contest)
            ],
            'quota' => 'numeric|min:0'
        ];
    }

    public function messages()
    {
        return [
            'title.required' => 'Judul harus diisi.',
            'title.string' => 'Judul hanya boleh terdiri dari huruf dan spasi.',
            'title.unique' => 'Judul tersebut sudah digunakan sebelumnya.',
            'description.required' => 'Deskripsi harus diisi.',
            'start_date.required' => 'Tanggal mulai harus diisi.',
            'start_date.date_format' => 'Format tanggal mulai harus ditulis seperti ini: 01 Januari 2023.',
            'end_date.required' => 'Tanggal berakhir harus diisi.',
            'end_date.date_format' => 'Format tanggal berakhir harus ditulis seperti ini: 31 Januari 2023.',
            'end_date.after_or_equal' => 'Tanggal berakhir harus sama atau setelah tanggal mulai.',
            'slug.required' => 'Slug harus diisi.',
            'slug.unique' => 'Slug tersebut sudah digunakan sebelumnya.',
            'quota.numeric' => 'Kuota harus berupa angka.',
            'quota.min' => 'Kuota tidak boleh kurang dari 0.',
        ];
    }
}

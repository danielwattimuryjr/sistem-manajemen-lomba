<?php

namespace App\Http\Requests;

use App\Models\ContestAssessmentFactor;
use Illuminate\Foundation\Http\FormRequest;

class StoreParticipationScoreRequest extends FormRequest
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
        $availableRoles = ContestAssessmentFactor::pluck('id')->toArray();

        return [
            'form_penilaian' => 'required',
            'form_penilaian.*.factor_id' => [
                'required',
                'in:' . implode(',', $availableRoles),
            ],
            'form_penilaian.*.score' => 'required|numeric|min:1|max:100'
        ];
    }
}

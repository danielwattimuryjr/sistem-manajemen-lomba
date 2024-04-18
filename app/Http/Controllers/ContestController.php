<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreContestRequest;
use App\Http\Requests\UpdateContestRequest;
use App\Models\Contest;
use Illuminate\Support\Facades\{
    DB,
    Log
};
use Inertia\Inertia;

class ContestController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $contests = Contest::orderByDesc("created_at")->get([
            'title',
            'slug',
            'start_date',
            'end_date',
            'isActive'
        ]);

        return Inertia::render(
            'Private/ContestManagement/Index',
            compact('contests')
        );
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Private/ContestManagement/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreContestRequest $request)
    {
        DB::beginTransaction();
        try {
            $validated = $request->validated();
            $validated['created_by'] = auth()->id();

            Contest::create($validated);
            DB::commit();

            return to_route('perlombaan.index')->with('message', [
                'type' => 'success',
                'text' => 'Perlombaan berhasil ditambahkan.',
            ]);
        } catch (\Throwable $th) {
            Log::error('Exception caught: ' . $th->getMessage(), [
                'file' => $th->getFile(),
                'line' => $th->getLine(),
                'trace' => $th->getTraceAsString(),
            ]);

            DB::rollBack();

            return back()->with('message', [
                'type' => 'Error',
                'text' => 'Gagal menambahkan data perlombaan'
            ]);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Contest $contest)
    {
        $contest->load('users');

        $data = $contest->only([
            'title',
            'slug',
            'start_date',
            'end_date',
            'description',
            'isActive'
        ]);

        $participants = $contest->users->map(function ($user) use ($contest) {
            $pivot = $user->pivot->only('created_at');
            return array_merge($user->only([
                'full_name',
                'email',
            ]), $pivot);
        });

        return Inertia::render(
            'Private/ContestManagement/Detail',
            compact('data', 'participants')
        );
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Contest $contest)
    {
        $data = $contest->only([
            'title',
            'quota',
            'description',
            'slug',
            'isActive',
            'end_date',
            'start_date'
        ]);

        return Inertia::render(
            'Private/ContestManagement/Edit',
            compact('data')
        );
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateContestRequest $request, Contest $contest)
    {
        DB::beginTransaction();
        try {
            $contest->update($request->validated());
            DB::commit();

            return to_route('perlombaan.index')->with('message', [
                'type' => 'success',
                'text' => 'Data perlombaan berhasil diperbaharui.'
            ]);
        } catch (\Throwable $th) {
            Log::error('Exception caught: ' . $th->getMessage(), [
                'file' => $th->getFile(),
                'line' => $th->getLine(),
                'trace' => $th->getTraceAsString(),
            ]);

            DB::rollBack();

            return back()->with('message', [
                "type" => "error",
                "text" => 'Terjadi kesalahan saat memperbaharui data perlombaan.'
            ]);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Contest $contest)
    {
        DB::beginTransaction();
        try {
            $contest->delete();

            DB::commit();

            return to_route('perlombaan.index')->with('message', [
                'type' => 'success',
                'text' => 'Perlombaan berhasil dihapus.'
            ]);
        } catch (\Throwable $th) {
            Log::error('Exception caught: ' . $th->getMessage(), [
                'file' => $th->getFile(),
                'line' => $th->getLine(),
                'trace' => $th->getTraceAsString(),
            ]);

            DB::rollBack();

            return back()->with('message', [
                'type' => 'error',
                'text' => 'Terjadi kesalahan saat menghapus data perlombaan.'
            ]);
        }
    }

    public function bulkActions($slugs, $action_type)
    {
        // dd($slugs);
        $slug_array = explode(',', $slugs);

        if (empty($slug_array) || !$action_type) {
            return back()->with('message', [
                'type' => 'error',
                'text' => 'Tidak ada data yang dipilih.'
            ]);
        }

        switch ($action_type) {
            case 'delete':
                $this->bulkDelete($slug_array);
                break;
            case 'activate':
                $this->bulkUpdateStatus($slug_array, true);
                break;
            case 'deactivate':
                $this->bulkUpdateStatus($slug_array, false);
                break;
            default:
                break;
        }


    }

    public function bulkDelete($slugs)
    {
        DB::beginTransaction();
        try {
            // Hapus relasi terlebih dahulu
            foreach ($slugs as $slug) {
                $contest = Contest::where('slug', $slug)->first();
                if ($contest) {
                    $contest->users()->detach(); // Menghapus relasi dengan users
                }
            }

            // Hapus entitas utama
            Contest::whereIn('slug', $slugs)->delete();

            DB::commit();

            return to_route('perlombaan.index')->with('message', [
                'type' => 'success',
                'text' => 'Perlombaan berhasil dihapus.'
            ]);
        } catch (\Throwable $th) {
            Log::error('Exception caught: ' . $th->getMessage(), [
                'file' => $th->getFile(),
                'line' => $th->getLine(),
                'trace' => $th->getTraceAsString(),
            ]);

            DB::rollBack();

            return back()->with('message', [
                'type' => 'error',
                'text' => 'Terjadi kesalahan saat menghapus data perlombaan.'
            ]);
        }
    }

    public function bulkUpdateStatus($slugs, $status)
    {
        DB::beginTransaction();
        try {
            Contest::whereIn('slug', $slugs)->update([
                'isActive' => $status
            ]);

            DB::commit();

            $messageText = $status ? "Perlombaan berhasil diaktifkan" : "Perlombaan berhasil di nonaktifkan";

            return to_route('perlombaan.index')->with('message', [
                'type' => 'success',
                'text' => $messageText
            ]);
        } catch (\Throwable $th) {
            Log::error('Exception caught: ' . $th->getMessage(), [
                'file' => $th->getFile(),
                'line' => $th->getLine(),
                'trace' => $th->getTraceAsString(),
            ]);

            DB::rollBack();

            $errorMessage = $status ? "Terjadi kesalahan saat mengaktifkan data perlombaan." : "Terjadi kesalahan saat menonaktifkan data perlombaan.";

            return back()->with('message', [
                'type' => 'error',
                'text' => $errorMessage
            ]);
        }
    }
}

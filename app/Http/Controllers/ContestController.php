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
        $contests = Contest::orderBy('created_at', 'desc')
                        ->get(['title', 'description', 'start_date', 'end_date', 'isActive', 'slug']);

        return Inertia::render('Contest/Index', compact('contests'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Contest/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreContestRequest $request)
    {
        DB::beginTransaction();
        try {
            Contest::create($request->validated());
            DB::commit();
            
            return to_route('perlombaan.index')->with('success', 'Perlombaan berhasil ditambahkan!');
        } catch (\Throwable $th) {
            Log::error('Exception caught: ' . $th->getMessage(), [
                'file' => $th->getFile(),
                'line' => $th->getLine(),
                'trace' => $th->getTraceAsString(),
            ]);

            DB::rollBack();
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Contest $contest)
    {
        $contestDetails = $contest->only(['title', 'description', 'start_date', 'end_date', 'isActive', 'slug']);

        return Inertia::render('Contest/Detail', [
            'contest' => $contestDetails
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Contest $contest)
    {
        $contestDetails = $contest->only(['title', 'description', 'start_date', 'end_date', 'isActive', 'slug']);

        return Inertia::render('Contest/Edit',[
           'contest' => $contestDetails
        ]);
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
            
            return to_route('perlombaan.index');
        } catch (\Throwable $th) {
            Log::error('Exception caught: ' . $th->getMessage(), [
                'file' => $th->getFile(),
                'line' => $th->getLine(),
                'trace' => $th->getTraceAsString(),
            ]);

            DB::rollBack();
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

            return to_route('perlombaan.index')->with('success', 'Perlombaan berhasil dihapus!');
        } catch (\Throwable $th) {
            Log::error('Exception caught: ' . $th->getMessage(), [
                'file' => $th->getFile(),
                'line' => $th->getLine(),
                'trace' => $th->getTraceAsString(),
            ]);

            DB::rollBack();
        }
    }
}

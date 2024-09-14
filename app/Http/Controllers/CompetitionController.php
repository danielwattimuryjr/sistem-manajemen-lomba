<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreCompetitionRequest;
use App\Http\Requests\UpdateCompetitionRequest;
use App\Models\Competition;
use App\Models\Role;
use Illuminate\Http\Request;

class CompetitionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $competitions = Competition::query()
            ->where('isActive', true)
            ->when(
                value: $request->search,
                callback: fn($query, $value) => $query->where('namaPerlombaan', 'like', '%', $value, '%')
            )->get();

        return response()->json($competitions);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $roles = Role::orderBy('created_at', 'ASC')
            ->get(['id', 'display_name']);

        return response()->json($roles);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCompetitionRequest $request)
    {
        $competition = Competition::create($request->validated());

        return response()->json($competition);
    }

    /**
     * Display the specified resource.
     */
    public function show(Competition $competition)
    {
        return response()->json($competition);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Competition $competition)
    {
        $roles = Role::orderBy('created_at', 'ASC')
            ->get(['id', 'display_name']);
        return response()->json([$competition, $roles]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCompetitionRequest $request, Competition $competition)
    {
        
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Competition $competition)
    {
        //
    }
}

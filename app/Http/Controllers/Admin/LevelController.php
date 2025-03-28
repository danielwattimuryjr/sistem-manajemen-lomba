<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\LevelResource;
use App\Models\Level;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class LevelController extends Controller
{
  /**
   * Display a listing of the resource.
   */
  public function index(Request $request)
  {
    $request->validate([
      'field' => Rule::in(['updated_at', 'created_at', 'name', 'slug', 'users_count']),
      'direction' => Rule::in(['asc', 'desc'])
    ]);

    $limit = $request->input('limit', 10);

    $levels = LevelResource::collection(
      Level::query()
        ->withCount('users')
        ->when($request->search, function ($query, $value) {
          $query->where(function ($q) use ($value) {
            $q->where('name', 'like', '%' . $value . '%');
          });
        })
        ->when($request->field && $request->direction, function ($query) use ($request) {
          if ($request->field === 'users_count') {
            $query->orderBy('users_count', $request->direction);
          } else {
            $query->orderBy($request->field, $request->direction);
          }
        }, function ($query) {
          $query->latest();
        })
        ->fastPaginate($limit)
        ->withQueryString()
    );

    return Inertia::render('admin/levels/level-list/index', [
      'levels' => fn() => $levels,
      'state' => $request->only('limit', 'page', 'search', 'field', 'direction')
    ]);
  }
}

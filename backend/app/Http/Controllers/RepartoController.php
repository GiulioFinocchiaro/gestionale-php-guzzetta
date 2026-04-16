<?php

namespace App\Http\Controllers;

use App\Models\Reparto;
use Illuminate\Http\Request;

class RepartoController extends Controller
{
    public function index()
    {
        $reparti = Reparto::all();

        return response()->json([
            'success' => true,
            'data' => $reparti,
        ], 200);
    }

    public function show($id)
    {
        $reparto = Reparto::find($id);

        if (!$reparto) {
            return response()->json([
                'success' => false,
                'message' => 'Reparto non trovato',
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $reparto,
        ], 200);
    }
}

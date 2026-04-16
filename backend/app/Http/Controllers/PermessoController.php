<?php

namespace App\Http\Controllers;

use App\Models\Permesso;
use Illuminate\Http\Request;

class PermessoController extends Controller
{
    public function byDipendente($dipendenteId)
    {
        $permessi = Permesso::where('FK_Dipendente', $dipendenteId)->get();

        return response()->json([
            'success' => true,
            'data' => $permessi,
        ], 200);
    }
}

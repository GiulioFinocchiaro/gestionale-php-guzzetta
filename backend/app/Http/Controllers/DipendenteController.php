<?php

namespace App\Http\Controllers;

use App\Models\Dipendente;
use Illuminate\Http\Request;

class DipendenteController extends Controller
{
    public function index()
    {
        $dipendenti = Dipendente::all();

        return response()->json([
            'success' => true,
            'data' => $dipendenti,
        ], 200);
    }

    public function show($id)
    {
        $dipendente = Dipendente::find($id);

        if (!$dipendente) {
            return response()->json([
                'success' => false,
                'message' => 'Dipendente non trovato',
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $dipendente,
        ], 200);
    }

    public function store(Request $request)
    {
        $dati = $request->validate([
            'Fk_Reparto' => 'required|integer',
            'nome' => 'required|string|max:40',
            'cognome' => 'required|string|max:50',
            'dataNascita' => 'nullable|date',
            'codFiscale' => 'required|string|unique:Dipendente,codFiscale',
            'dataAssunzione' => 'nullable|date',
            'sesso' => 'nullable|in:M,F',
            'comuneNascita' => 'nullable|string|max:50',
            'stipendioAnnuo' => 'nullable|integer',
            'pathFoto' => 'nullable|string|max:50',
            'foto' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        if ($request->hasFile('foto')) {
            $file = $request->file('foto');
            $filename = uniqid() . 'Controllers' . $file->getClientOriginalExtension();
            $path = $file->storeAs('foto', $filename, 'public');
            $dati['pathFoto'] = $path;
        }

        $dipendente = Dipendente::create($dati);

        return response()->json([
            'success' => true,
            'message' => 'Dipendente creato',
            'data' => $dipendente,
        ], 201);
    }

    public function byReparto($repartoId)
    {
        $dipendenti = Dipendente::where('Fk_Reparto', $repartoId)->get();

        return response()->json([
            'success' => true,
            'data' => $dipendenti,
        ], 200);
    }
}

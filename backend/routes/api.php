<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\DipendenteController;
use App\Http\Controllers\RepartoController;
use App\Http\Controllers\PermessoController;
use App\Http\Controllers\StudenteController;

Route::prefix('admin')->group(function () {
    Route::post('/login', [AdminController::class, 'login']);
    Route::post('/logout', [AdminController::class, 'logout']);

    Route::get('/', [AdminController::class, 'index']);       // get all
    Route::get('/{id}', [AdminController::class, 'show']);    // get by id
});

Route::prefix('dipendenti')->group(function () {
    Route::get('/', [DipendenteController::class, 'index']);
    Route::get('/{id}', [DipendenteController::class, 'show']);
    Route::post('/', [DipendenteController::class, 'store']);

    Route::get('/reparto/{repartoId}', [DipendenteController::class, 'byReparto']);
});

Route::prefix('reparti')->group(function () {
    Route::get('/', [RepartoController::class, 'index']);
    Route::get('/{id}', [RepartoController::class, 'show']);
});

Route::prefix('permessi')->group(function () {
    Route::get('/dipendente/{dipendenteId}', [PermessoController::class, 'byDipendente']);
});

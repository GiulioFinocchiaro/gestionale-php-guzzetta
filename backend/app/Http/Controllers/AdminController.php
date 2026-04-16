<?php

namespace App\Http\Controllers;

use App\Models\TbAdmin;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class AdminController extends Controller
{
    public function login(Request $request)
    {
        $request->validate([
            'username' => 'required|string',
            'password' => 'required|string',
        ]);

        $admin = TbAdmin::where('username', $request->username)->first();

        if (!$admin || $admin->password !== md5($request->password)) {
            throw ValidationException::withMessages([
                'username' => ['Username o password sbagliati.'],
            ]);
        }

        return response()->json([
            'success' => true,
            'message' => 'Login ok',
            'data' => [
                'admin' => $admin,
            ],
        ], 200);
    }
}

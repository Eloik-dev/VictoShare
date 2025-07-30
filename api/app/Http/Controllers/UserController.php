<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();

        return response()->json([
            'user' => $user
        ]);
    }

    // TODO: Adjust login logic
    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');
        
        $guestCode = $request->input('guestCode');
        if ($guestCode) {
            $credentials = [
                'email' => $guestCode . '@guest.com',
                'password' => $guestCode
            ];
        }

        if (!Auth::attempt($credentials)) {
            return response()->json([
                'error' => 'Invalid credentials',
                'status' => 401
            ]);
        }

        $user = Auth::user();
        $request->session()->regenerate();

        return response()->json([
            'status' => 200,
            'user' => $user,
        ]);
    }


    public function register(Request $request)
    {
        $request->validate([
            'username' => 'required',
            'email' => 'required|email|unique:users',
            'password' => 'required|min:8',
        ], [
            'username.required' => 'Le nom d\'utilisateur est requis.',
            'email.required' => 'Le courriel est requis.',
            'email.email' => 'Le courriel n\'est pas valide.',
            'email.unique' => 'Le courriel est déjà utilisé.',
            'password.required' => 'Le mot de passe est requis.',
            'password.min' => 'Le mot de passe doit contenir au moins 8 caractères.',
        ]);

        User::create([
            'username' => $request->username,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        return response()->json([
            'message' => 'Compte créé avec succès'
        ], 201);
    }

    public function logout(Request $request)
    {
        $request->session()->invalidate();

        return response()->json([
            'message' => 'Déconnecté avec succès'
        ]);
    }
}
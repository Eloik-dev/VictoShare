<?php

namespace App\Http\Controllers;

use App\Constants\HttpCodes;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

/**
 * Contrôleur servant à la gestion des utilisateurs
 */
class UserController extends Controller
{
    /**
     * Retourne les informations de l'utilisateur connecté
     * 
     * @param Request $request
     * @return JsonResponse
     */
    public function index(Request $request): JsonResponse
    {
        $user = $request->user();

        return response()->json([
            'user' => $user
        ]);
    }

    /**
     * Connexion d'un utilisateur
     * 
     * @param Request $request
     * @return JsonResponse
     */
    public function login(Request $request): JsonResponse
    {
        $credentials = $request->only('email', 'password');

        $guestCode = $request->input('guestCode');
        if ($guestCode) {
            $credentials = [
                'email' => $guestCode . '@guest.com',
                'password' => $guestCode
            ];
        }

        if (!auth()->guard('web')->attempt($credentials)) {
            return response()->json([
                'error' => 'Invalid credentials',
                'status' => HttpCodes::UNAUTHORIZED
            ], HttpCodes::UNAUTHORIZED);
        }

        $user = auth()->user();
        $request->session()->regenerate();

        return response()->json([
            'status' => HttpCodes::OK,
            'user' => $user,
        ], HttpCodes::OK);
    }

    /**
     * Création d'un utilisateur
     * 
     * @param Request $request
     * @return JsonResponse
     */
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
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

        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors(),
            ], HttpCodes::BAD_REQUEST);
        }

        User::create([
            'username' => $request->username,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        return response()->json([
            'message' => 'Compte créé avec succès'
        ], HttpCodes::CREATED);
    }

    /**
     * Déconnexion d'un utilisateur
     * 
     * @param Request $request
     * @return JsonResponse
     */
    public function logout(Request $request)
    {
        $request->session()->invalidate();

        return response()->json([
            'message' => 'Déconnecté avec succès'
        ]);
    }
}
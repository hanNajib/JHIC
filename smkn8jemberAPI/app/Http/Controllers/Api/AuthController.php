<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Models\User;
use App\Traits\ApiResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    use ApiResponse;

    public function login(LoginRequest $request) {
        $spa = $request->boolean('spa', false);
        $credentials = $request->credentials();

        $user = User::whereLogin($request->credentials())->first();

        if(!$user || !Auth::attempt($credentials)) {
            return $this->statusMessage('Invalid credentials', 401);
        }

        if(!$spa) {
            $token = $user->createToken('auth_token')->plainTextToken;
            return $this->json([
                'status' => 'success',
                'message' => 'Login successful',
                'user' => $user,
                'token' => $token,
            ], 200);
        } else {
            $request->session()->regenerate();
            return $this->json([
                'status' => 'success',
                'message' => 'Login successful',
                'user' => $user,
            ], 200);
        }
    }

    public function logout(Request $request) {
        if($request->expectsJson()) {
            $request->user()->currentAccessToken()->delete();
            return $this->statusMessage('Logged out', 200);
        } else {
            Auth::guard('web')->logout();
            $request->session()->invalidate();
            $request->session()->regenerateToken();
            return $this->statusMessage('Logged out', 200);
        }
    }

    public function me(Request $request) {
        return $this->success($request->user(), 'User retrieved successfully');
    }
    
}

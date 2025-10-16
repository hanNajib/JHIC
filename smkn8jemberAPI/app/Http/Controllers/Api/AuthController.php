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

    public function login(LoginRequest $request)
    {
        $spa = $request->boolean('spa', false);
        $credentials = $request->credentials();

        $user = User::whereLogin($request->credentials())->first();

        if (!$user || !Auth::attempt($credentials)) {
            return $this->statusMessage('Invalid credentials', 401);
        }

        if (!$spa) {
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

    public function logout(Request $request)
    {
        $spa = $request->boolean('spa', false);
        if (!$spa) {
            $request->user()->currentAccessToken()->delete();
            return $this->statusMessage('Logged out', 200);
        } else {
            Auth::guard('web')->logout();
            $request->session()->invalidate();
            $request->session()->regenerateToken();
            return $this->statusMessage('Logged out', 200);
        }
    }

    public function me(Request $request)
    {
        return $this->success($request->user(), 'User retrieved successfully');
    }

    public function update(Request $request)
    {
        $user = Auth::user();
        $currentUser = User::find($user->id);

        if (!$user || !$currentUser) {
            return $this->notFound('User not found');
        }

        $request->validate([
            'username' => 'sometimes|string|unique:users,username,' . $currentUser->id,
            'email' => 'sometimes|email|unique:users,email,' . $currentUser->id,
            'bio' => 'sometimes|string|nullable',
            'phone_number' => 'sometimes|string|nullable',
            'profile_image' => 'sometimes|image|mimes:jpeg,jpg,png,gif,svg|max:2048',
        ]);

        $updateData = $request->only(['username', 'email', 'bio', 'phone_number']);

        if ($request->hasFile('profile_image')) {
            $imagePath = $request->file('profile_image')->store('profiles', 'public');
            $updateData['profile_image'] = $imagePath;
        }


        $currentUser->update($updateData);

        return $this->success($currentUser->fresh(), 'User updated successfully');
    }
}

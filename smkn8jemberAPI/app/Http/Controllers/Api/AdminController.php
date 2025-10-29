<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AdminController extends Controller
{
    public function index(Request $request)
    {
        $adminsPaginated = User::where('role', 'admin')
            ->applyFilters($request, ['username', 'email'], []);
        return $this->cursorPaginated($adminsPaginated, 'Admins retrieved successfully');
    }

    public function show($id)
    {
        $admin = User::whereRole('admin')->find($id);
        if (!$admin) {
            return $this->notFound('Admin not found');
        }
        return $this->success($admin, 'Admin retrieved successfully');
    }
    public function getByName($name)
    {
        $admin = User::where('username', $name)->first();
        if (!$admin) {
            return $this->notFound('Admin not found');
        }
        return $this->success($admin, 'Admin retrieved successfully');
    }

    public function create(Request $request)
    {
        $validated = $request->validate([
            'username' => 'required|string|unique:users,username',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:8',
            'phone_number' => 'nullable|string',
            'bio' => 'nullable|string',
            'role' => 'nullable|in:superadmin,admin',
            'profile_image' => 'nullable|image|mimes:jpeg,jpg,png,gif,svg|max:2048'
        ]);

        $validated['role'] = $request->role === 'superadmin' || $request->role === 'super_admin' ? 'superadmin' : 'admin';

        $validated['password'] = Hash::make($validated['password']);

        if ($request->hasFile('profile_image')) {
            $imagePath = $request->file('profile_image')->store('profiles', 'public');
            $validated['profile_image'] = $imagePath;
        }

        $admin = User::create($validated);
        return $this->created($admin, 'Admin created successfully');
    }

    public function update(Request $request, $id)
    {
        $admin = User::whereRole('admin')->find($id);
        if (!$admin) {
            return $this->notFound('Admin not found');
        }

        $validated = $request->validate([
            'username' => 'sometimes|required|string|unique:users,username,' . $admin->id,
            'email' => 'sometimes|required|email|unique:users,email,' . $admin->id,
            'password' => 'sometimes|nullable|string|min:8',
            'phone_number' => 'nullable|string',
            'bio' => 'nullable|string',
            'role' => 'nullable|in:superadmin,admin',
            'profile_image' => 'sometimes|image|mimes:jpeg,jpg,png,gif,svg|max:2048'
        ]);

        if (isset($validated['password'])) {
            $validated['password'] = Hash::make($validated['password']);
        }

        $validated['role'] = $request->role === 'superadmin' || $request->role === 'super_admin' ? 'superadmin' : 'admin';

        if ($request->hasFile('profile_image')) {
            $imagePath = $request->file('profile_image')->store('profiles', 'public');
            $validated['profile_image'] = $imagePath;
        }

        $admin->update($validated);
        return $this->success($admin, 'Admin updated successfully');
    }

    public function delete($id)
    {
        $admin = User::whereRole('admin')->find($id);
        if (!$admin) {
            return $this->notFound('Admin not found');
        }
        $admin->delete();
        return $this->success(null, 'Admin deleted successfully');
    }

    public function restore($id)
    {
        $admin = User::withTrashed()->find($id);
        if (!$admin) {
            return $this->notFound("Admin not found");
        }
        $admin->restore();
        return $this->statusMessage("Admin restored successfully");
    }
}

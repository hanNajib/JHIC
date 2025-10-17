<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\SchoolSetting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class SchoolSettingsController extends Controller
{
    public function index(Request $request) {
        $settings = SchoolSetting::all();
        return $this->json([
            'message' => 'School settings retrieved successfully',
            'data' => $settings
        ], 200);
    }

    public function update(Request $request, $title) {
        $setting = SchoolSetting::whereSetting($title)->first();
        return $setting;

        if(!$setting) {
            return $this->notFound('Setting not found');
        }

        $type = $setting->type;

        if($type === 'image') {
            $validated = $request->validate([
                'value' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            ]);

            if($setting->value && Storage::disk('public')->exists($setting->value)) {
                Storage::disk('public')->delete($setting->value);
            }

            $imagePath = $request->file('value')->store('settings', 'public');
            $setting->value = $imagePath;
            $setting->save();

            return $this->updated($setting, 'Setting updated successfully');
        }

        $validated = $request->validate([
            'value' => 'required|string',
        ]);

        $setting->value = $validated['value'];
        $setting->save();

        return $this->updated($setting, 'Setting updated successfully');
    }

    public function getByTitle($title) {
        $setting = SchoolSetting::whereSetting($title)->first();
        if(!$setting) {
            return $this->notFound('Setting not found');
        }

        return $this->success($setting);
    }
}

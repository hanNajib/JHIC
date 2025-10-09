<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\SchoolSetting;
use Illuminate\Http\Request;

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
        if(!$setting) {
            return $this->notFound('Setting not found');
        }

        $validated = $request->validate([
            'value' => 'required|string',
        ]);

        $setting->value = $validated['value'];
        $setting->save();

        return $this->updated($setting, 'Setting updated successfully');
    }
}

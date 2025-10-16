<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\SchoolData;
use Illuminate\Http\Request;

class SchoolDataController extends Controller
{
    public function index()
    {
        $schoolData = SchoolData::all();

        return $this->success($schoolData, 'School Data retrieved successfully');
    }

    public function update(Request $request, $name)
    {
        $request->validate([
            'type' => 'sometimes|string',
            'name' => 'sometimes|string',
            'value' => 'sometimes|string'
        ]);

        $schoolData = SchoolData::where("name", $name);
        if (!$schoolData) {
            return $this->notFound('School data not found');
        }

        $updateData = $request->only('type', 'name', 'value');
        $schoolData->update($updateData);

        return $this->success($schoolData, 'School Data updated successfully');
    }

    public function show($id)
    {
        $schoolData = SchoolData::whereName($id);
        if (!$schoolData) {
            return $this->notFound('School Data not found');
        }

        return $this->success($schoolData);
    }
}

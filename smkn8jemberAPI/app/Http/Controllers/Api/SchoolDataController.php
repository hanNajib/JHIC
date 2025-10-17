<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Extracurricular;
use App\Models\Facility;
use App\Models\Major;
use App\Models\SchoolData;
use App\Models\Staff;
use Illuminate\Http\Request;

class SchoolDataController extends Controller
{
    public function index()
    {
        $schoolData = SchoolData::all();
        $majorCount = Major::count();
        $teacherCount = Staff::where('role', 'teacher')->count();
        $ekstraCount = Extracurricular::count();
        $facilityCount = Facility::count();

        return $this->success([
            'data' => $schoolData,
            'major_count' => $majorCount,
            'teacher_count' => $teacherCount,
            'ekstra_count' => $ekstraCount,
            'facility_count' => $facilityCount,
        ], 'School Data retrieved successfully');
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

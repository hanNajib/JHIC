<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Subject;
use Illuminate\Http\Request;

class SubjectsController extends Controller
{
    public function index(Request $request)
    {
        $subjects = Subject::with('major')->applyFilters(
            $request,
            ['name', 'description'],
            ['major_id']
        );
        return $this->cursorPaginated($subjects, 'Subjects retrieved successfully');
    }

    public function create(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
            'description' => 'nullable|string',
            'major_id' => 'required|exists:majors,id',
        ]);

        $createData = $request->only(['name', 'description', 'major_id']);
        $subjects = Subject::create($createData);
        return $this->created($subjects, 'Subject created successfully');
    }

    public function show($id)
    {
        $subjects = Subject::find($id);
        if (!$subjects) {
            return $this->notFound('Subject not found');
        }
        return $this->success($subjects);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'name' => 'sometimes|string',
            'description' => 'sometimes|nullable|string',
            'major_id' => 'sometimes|exists:majors,id',
        ]);

        $subjects = Subject::find($id);
        if (!$subjects) {
            return $this->notFound('Subject not found');
        }

        $updateData = $request->only(['name', 'description', 'major_id']);
        $subjects->update($updateData);
        return $this->success($subjects, 'Subject updated successfully');
    }

    public function delete($id)
    {
        $subjects = Subject::find($id);
        if (!$subjects) {
            return $this->notFound('Subject not found');
        } else {
            $subjects->delete();
            return $this->statusMessage('Subject deleted successfully');
        }
    }

    public function restore($id)
    {
        $subjects = Subject::withTrashed()->find($id);
        if (!$subjects) {
            return $this->notFound("Subject not found");
        }
        $subjects->restore();
        return $this->statusMessage("Subject restored successfully");
    }
}

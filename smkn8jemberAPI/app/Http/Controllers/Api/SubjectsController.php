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

    public function forceDelete($id)
    {
        $subject = Subject::withTrashed()->find($id);
        if (!$subject) {
            return $this->notFound('Subject not found');
        }

        $subject->forceDelete();
        return $this->deleted('Subject permanently deleted');
    }

    public function bulkRestore(Request $request)
    {
        $ids = $request->validate([
            'ids' => 'required|array|min:1',
            'ids.*' => 'integer'
        ])['ids'];

        $restored = Subject::withTrashed()->whereIn('id', $ids)->whereNotNull('deleted_at')->restore();
        
        if ($restored === 0) {
            return $this->notFound('No deleted subjects found with the provided IDs');
        }

        return $this->statusMessage($restored . ' subject(s) restored successfully');
    }

    public function bulkForceDelete(Request $request)
    {
        $ids = $request->validate([
            'ids' => 'required|array|min:1',
            'ids.*' => 'integer'
        ])['ids'];

        $subjects = Subject::withTrashed()->whereIn('id', $ids)->get();
        
        if ($subjects->isEmpty()) {
            return $this->notFound('No subjects found with the provided IDs');
        }

        Subject::withTrashed()->whereIn('id', $ids)->forceDelete();
        return $this->deleted(count($subjects) . ' subject(s) permanently deleted');
    }
}

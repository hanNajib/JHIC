<?php

namespace App\Traits;

trait ApiResponse
{

    /**
     * Response dengan status message (bisa success atau error berdasarkan HTTP status code)
     */
    protected function statusMessage(string $message, $httpStatus = 200)
    {
        $status = ($httpStatus >= 200 && $httpStatus < 300) ? 'success' : 'error';
        return response()->json([
            'status'  => $status,
            'message' => $message,
        ], $httpStatus);
    }

    /**
     * Response json
     */
    protected function json($data, int $status = 200)
    {
        return response()->json($data, $status);
    }

    /**
     * Response untuk data sukses (single data / list tanpa pagination)
     */
    protected function success($data = null, string $message = 'Success', int $status = 200)
    {
        return response()->json([
            'status'  => 'success',
            'message' => $message,
            'data'    => $data,
        ], $status);
    }

    /**
     * Response error umum
     */
    protected function error(string $message = 'Error', int $status = 400, $errors = null)
    {
        return response()->json([
            'status'  => 'error',
            'message' => $message,
            'errors'  => $errors,
        ], $status);
    }

    /**
     * Response paginated data
     */
    protected function paginated($paginator, string $message = 'Success')
    {
        return response()->json([
            'status'  => 'success',
            'message' => $message,
            'data'    => $paginator->items(),
            'meta'    => [
                'current_page' => $paginator->currentPage(),
                'last_page'    => $paginator->lastPage(),
                'per_page'     => $paginator->perPage(),
                'total'        => $paginator->total(),
            ],
        ]);
    }
    /**
     * Response not found (404)
     */
    protected function notFound(string $message = 'Data tidak ditemukan')
    {
        return response()->json([
            'status'  => 'error',
            'message' => $message,
        ], 404);
    }

    /**
     * Response forbidden (403)
     */
    protected function forbidden(string $message = 'Forbidden')
    {
        return response()->json([
            'status'  => 'error',
            'message' => $message,
        ], 403);
    }

    /**
     * Response untuk created (201)
     */
    protected function created($data = null, string $message = 'Data berhasil dibuat')
    {
        return response()->json([
            'status'  => 'success',
            'message' => $message,
            'data'    => $data,
        ], 201);
    }

    /**
     * Response untuk updated (200)
     */
    protected function updated($data = null, string $message = 'Data berhasil diupdate')
    {
        return response()->json([
            'status'  => 'success',
            'message' => $message,
            'data'    => $data,
        ], 200);
    }

    /**
     * Response untuk deleted (200)
     */
    protected function deleted(string $message = 'Data berhasil dihapus')
    {
        return response()->json([
            'status'  => 'success',
            'message' => $message,
        ], 200);
    }

    /**
     * Response server error (500)
     */
    protected function serverError(string $message = 'Internal Server Error')
    {
        return response()->json([
            'status'  => 'error',
            'message' => $message,
        ], 500);
    }
}

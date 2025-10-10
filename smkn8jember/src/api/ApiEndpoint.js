import { apiClient, axiosClient } from "./ApiClient"


export const AuthApi = {
    csrf: () => axiosClient.get('/sanctum/csrf-cookie'),
    login: (data) => apiClient.post('/auth/login?spa=true', data),
    logout: () => apiClient.post('/auth/logout'),
    fetchUser: () => apiClient.get('/auth/me'),
}


// SUPERADMIN ROUTE API
export const AdminApi = {
    get : (params) => apiClient.get('/admins', { params }),
    getById : (id) => apiClient.get(`/admins/${id}`),
    create : (data) => apiClient.post('/admins', data),
    update : (id, data) => apiClient.post(`/admins/${id}?_method=PUT`, data),
    delete : (id) => apiClient.delete(`/admins/${id}`),
    restore: (id) => apiClient.post(`/admins/${id}/restore`)
} 

export const WebSettingsApi = {
    getSettings: () => apiClient.get('/settings'),
    updateSetting: (title, data) => apiClient.post(`/settings/${title}?_method=PUT`, data),
}


// CRUD ROUTE API
export const AnnouncementApi = {
    get : (params) => apiClient.get('/announcements', { params }),
    getById : (id) => apiClient.get(`/announcements/${id}`),
    create : (data) => apiClient.post('/announcements', data),
    update : (id, data) => apiClient.post(`/announcements/${id}?_method=PUT`, data),
    delete : (id) => apiClient.delete(`/announcements/${id}`),
}

export const FacilityApi = {
    get : (params) => apiClient.get('/facility', { params }),
    getById : (id) => apiClient.get(`/facility/${id}`),
    create : (data) => apiClient.post('/facility', data),
    update : (id, data) => apiClient.post(`/facility/${id}?_method=PUT`, data),
    delete : (id) => apiClient.delete(`/facility/${id}`),
}

export const MajorsApi = {
    get : (params) => apiClient.get('/majors', { params }),
    getById : (id) => apiClient.get(`/majors/${id}`),
    create : (data) => apiClient.post('/majors', data, {headers: {'Content-Type': 'multipart/form-data'}}),
    update : (id, data) => apiClient.post(`/majors/${id}?_method=PUT`, data),
    delete : (id) => apiClient.delete(`/majors/${id}`),
    restore: (id) => apiClient.post(`majors/${id}/restore`)
}

export const PartnersApi = {
    get : (params) => apiClient.get('/partners', { params }),
    getById : (id) => apiClient.get(`/partners/${id}`),
    create : (data) => apiClient.post('/partners', data),
    update : (id, data) => apiClient.post(`/partners/${id}?_method=PUT`, data),
    delete : (id) => apiClient.delete(`/partners/${id}`),
}

export const ExtracurricularApi = {
    get : (params) => apiClient.get('/extracurricular', { params }),
    getById : (id) => apiClient.get(`/extracurricular/${id}`),
    create : (data) => apiClient.post('/extracurricular', data),
    update : (id, data) => apiClient.post(`/extracurricular/${id}?_method=PUT`, data),
    delete : (id) => apiClient.delete(`/extracurricular/${id}`),
}

export const ChanceCarrierApi = {
    get : (params) => apiClient.get('/chance-carrier', { params }),
    getById : (id) => apiClient.get(`/chance-carrier/${id}`),
    create : (data) => apiClient.post('/chance-carrier', data),
    update : (id, data) => apiClient.post(`/chance-carrier/${id}?_method=PUT`, data),
    delete : (id) => apiClient.delete(`/chance-carrier/${id}`),
}

export const GalleryApi = {
    get : (params) => apiClient.get('/gallery', { params }),
    getById : (id) => apiClient.get(`/gallery/${id}`),
    create : (data) => apiClient.post('/gallery', data),
    update : (id, data) => apiClient.post(`/gallery/${id}?_method=PUT`, data),
    delete : (id) => apiClient.delete(`/gallery/${id}`),
}

export const SubjectApi = {
    get : (params) => apiClient.get('/subjects', { params }),
    getById : (id) => apiClient.get(`/subjects/${id}`),
    create : (data) => apiClient.post('/subjects', data),
    update : (id, data) => apiClient.post(`/subjects/${id}?_method=PUT`, data),
    delete : (id) => apiClient.delete(`/subjects/${id}`),
}

export const ArticleApi = {
    get : (params) => apiClient.get('/articles', { params }),
    getBySlug : (slug) => apiClient.get(`/articles/slug/${slug}`),
    create : (data) => apiClient.post('/articles', data),
    update : (id, data) => apiClient.post(`/articles/${id}?_method=PUT`, data),
    delete : (id) => apiClient.delete(`/articles/${id}`),
}


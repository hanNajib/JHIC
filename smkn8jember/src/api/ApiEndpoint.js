import { apiClient, axiosClient } from "./ApiClient";

export const AuthApi = {
  csrf: () => axiosClient.get("/sanctum/csrf-cookie"),
  login: (data) => apiClient.post("/auth/login?spa=true", data),
  logout: () => apiClient.post("/auth/logout"),
  fetchUser: () => apiClient.get("/auth/me"),
  update: (data) => apiClient.post("/auth/update?_method=PUT", data, {headers: {'Content-Type': 'multipart/form-data'}}),
};

// SUPERADMIN ROUTE API
export const AdminApi = {
  get: (params) => apiClient.get("/admins", { params }),
  getById: (id) => apiClient.get(`/admins/${id}`),
  create: (data) => apiClient.post("/admins", data),
  update: (id, data) => apiClient.post(`/admins/${id}?_method=PUT`, data),
  delete: (id) => apiClient.delete(`/admins/${id}`),
  restore: (id) => apiClient.post(`/admins/${id}/restore`),
};

export const WebSettingsApi = {
  getSettings: () => apiClient.get("/settings"),
  updateSetting: (title, data) =>
    apiClient.post(`/settings/${title}?_method=PUT`, data),
  getByTitle: (title) => apiClient.get(`/settings/${title}`),
};
export const StudentDataApi = {
  get: () => apiClient.get("/school-data"),
  update: (name, data) =>
    apiClient.post(`/school-data/${name}?_method=PUT`, data),
  getByName: (name) => apiClient.get(`/school-data/${name}`),
};

// CRUD ROUTE API
export const AnnouncementApi = {
    get : (params) => apiClient.get('/announcements', { params }),
    getById : (id) => apiClient.get(`/announcements/${id}`),
    create : (data) => apiClient.post('/announcements', data, {headers: {'Content-Type': 'multipart/form-data'}}),
    update : (id, data) => apiClient.post(`/announcements/${id}?_method=PUT`, data, {headers: {'Content-Type': 'multipart/form-data'}}),
    delete : (id) => apiClient.delete(`/announcements/${id}`),
    restore: (id) => apiClient.post(`announcements/${id}/restore`)
}


export const FacilityApi = {
    get : (params) => apiClient.get('/facility', { params }),
    getById : (id) => apiClient.get(`/facility/${id}`),
    create : (data) => apiClient.post('/facility', data,{headers: {'Content-Type': 'multipart/form-data'}}),
    update : (id, data) => apiClient.post(`/facility/${id}?_method=PUT`, data),
    delete : (id) => apiClient.delete(`/facility/${id}`),
    restore: (id) => apiClient.post(`facility/${id}/restore`)
}

export const MajorsApi = {
  get: (params) => apiClient.get("/majors", { params }),
  getById: (id) => apiClient.get(`/majors/${id}`),
  create: (data) =>
    apiClient.post("/majors", data, {
      headers: { "Content-Type": "multipart/form-data" },
    }),
  update: (id, data) => apiClient.post(`/majors/${id}?_method=PUT`, data),
  delete: (id) => apiClient.delete(`/majors/${id}`),
  restore: (id) => apiClient.post(`majors/${id}/restore`),
};
export const CategoryApi = {
  get: (params) => apiClient.get("/categories", { params }),
  getById: (id) => apiClient.get(`/categories/${id}`),
  create: (data) =>
    apiClient.post("/categories", data, {
      headers: { "Content-Type": "multipart/form-data" },
    }),
  update: (id, data) => apiClient.post(`/categories/${id}?_method=PUT`, data),
  delete: (id) => apiClient.delete(`/categories/${id}`),
  restore: (id) => apiClient.post(`categories/${id}/restore`),
};

export const PartnersApi = {
  get: (params) => apiClient.get("/partners", { params }),
  getById: (id) => apiClient.get(`/partners/${id}`),
  create: (data) => apiClient.post("/partners", data),
  update: (id, data) => apiClient.post(`/partners/${id}?_method=PUT`, data),
  delete: (id) => apiClient.delete(`/partners/${id}`),
  restore: (id) => apiClient.post(`partners/${id}/restore`),
};

export const ExtracurricularApi = {
  get: (params) => apiClient.get("/extracurriculars", { params }),
  getById: (id) => apiClient.get(`/extracurriculars/${id}`),
  create: (data) => apiClient.post("/extracurriculars", data),
  update: (id, data) =>
    apiClient.post(`/extracurriculars/${id}?_method=PUT`, data),
  delete: (id) => apiClient.delete(`/extracurriculars/${id}`),
  restore: (id) => apiClient.post(`extracurriculars/${id}/restore`),
};

export const ChanceCarrierApi = {
  get: (params) => apiClient.get("/chance-carriers", { params }),
  getById: (id) => apiClient.get(`/chance-carriers/${id}`),
  create: (data) => apiClient.post("/chance-carriers", data),
  update: (id, data) =>
    apiClient.post(`/chance-carriers/${id}?_method=PUT`, data),
  delete: (id) => apiClient.delete(`/chance-carriers/${id}`),
  restore: (id) => apiClient.post(`chance-carriers/${id}/restore`),
};

export const GalleryApi = {
    get : (params) => apiClient.get('/gallery', { params }),
    getById : (id) => apiClient.get(`/gallery/${id}`),
    create : (data) => apiClient.post('/gallery', data, {headers: {'Content-Type': 'multipart/form-data'}}),
    update : (id, data) => apiClient.post(`/gallery/${id}?_method=PUT`, data),
    delete : (id) => apiClient.delete(`/gallery/${id}`),
    restore: (id) => apiClient.post(`gallery/${id}/restore`)
}

export const SubjectApi = {
  get: (params) => apiClient.get("/subject", { params }),
  getById: (id) => apiClient.get(`/subject/${id}`),
  create: (data) => apiClient.post("/subject", data),
  update: (id, data) => apiClient.post(`/subject/${id}?_method=PUT`, data),
  delete: (id) => apiClient.delete(`/subject/${id}`),
  restore: (id) => apiClient.post(`/subject/${id}/restore`),
};

export const ArticleApi = {
    get : (params) => apiClient.get('/articles', { params }),
    getBySlug : (slug) => apiClient.get(`/articles/slug/${slug}`),
    create : (data) => apiClient.post('/articles', data, {headers: {'Content-Type': 'multipart/form-data'}}),
    update : (id, data) => apiClient.post(`/articles/${id}?_method=PUT`, data, {headers: {'Content-Type': 'multipart/form-data'}}),
    delete : (id) => apiClient.delete(`/articles/${id}`),
    restore: (id) => apiClient.post(`articles/${id}/restore`)
    
}


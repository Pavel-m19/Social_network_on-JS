import * as axios from 'axios';

let baseUrl = "https://social-network.samuraijs.com/api/1.0/"

const instance = axios.create({
    withCredentials: true,
    baseURL: "https://social-network.samuraijs.com/api/1.0/",
    headers: { "API-KEY": "d2e5bb9a-211c-41b0-93cb-0f54f2d56f6f" }
});


export const getUsersAPI = (term, pageNumber = 1, pageSize = 5) => {
    return instance.get(`users?page=${pageNumber}&count=${pageSize}&term=${term}`)
        .then(response => {
            return response.data;
        })
}

export const subscribeAPI = (method, user) => {
    return fetch(baseUrl + `follow/${user.id}`, {
        method: method,
        credentials: 'include',
        headers: {
            "API-KEY": "d2e5bb9a-211c-41b0-93cb-0f54f2d56f6f"
        }
    }).then(response => response.json())
}

export const getCurrentUserAPI = () => {
    return instance.get('auth/me')
        .then(response => { return response.data })
}

export const profileAPI = (userId) => {
    return instance.get("profile/" + userId)
        .then(response => { return response.data })
}

export const newStatusAPI = (status) => {
    return instance.put(`profile/status`, { status: status })
}

export const getStatusAPI = (userId) => {
    return instance.get(`profile/status/` + userId)
}

export const loginOnSiteAPI = (loginData) => {
    return instance.post(`/auth/login`, loginData)
}

export const logOutAPI = () => {
    return instance.delete(`/auth/login`)
}


export const upploadPhotoAPI = (imageFile) => {
    let formData = new FormData();
    formData.append('image', imageFile);
    let response = instance.put('profile/photo', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
    return response
}
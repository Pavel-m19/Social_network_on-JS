import * as axios from 'axios';

let baseUrl = "https://social-network.samuraijs.com/api/1.0/"

const instance = axios.create({
    withCredentials: true,
    baseURL: "https://social-network.samuraijs.com/api/1.0/",
    headers: {"API-KEY": '0ea61604-352f-49ec-b9f6-1ea74a3fd136'}
});


export const getUsersAPI = (pageNumber, pageSize) => {
    return fetch(baseUrl + `users?page=${pageNumber}&count=${pageSize}`, {
        credentials: 'include'
    })
        .then(response => response.json())
}

export const subscribeAPI = (method, user) => {
    return fetch(baseUrl + `follow/${user.id}`, {
        method: method,
        credentials: 'include',
        headers: {
            "API-KEY": '0ea61604-352f-49ec-b9f6-1ea74a3fd136'
        }
    }).then(response => response.json())
}

export const getCurrentUserAPI = () => {
    return fetch(baseUrl + 'auth/me', { credentials: "include" })
        .then(response => response.json())
}

export const profileAPI = (userId) => {
    return fetch(baseUrl + `profile/${userId}`)
      .then(response => response.json())
}

export const newStatusAPI = (status) => {    
    return instance.put(`profile/status`,{status: status})
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
import axios, { AxiosError } from "axios"
import {  ErrorResponse } from "../types"

const API_URL = import.meta.env.VITE_SERVER_URL

export const getEmail = async () => {
    try {
        const response = await axios.get(`${API_URL}/api/email`)
        return response.data.data
    } catch (error) {
        const axiosError = error as AxiosError<ErrorResponse>
        if (axiosError.request) {
            throw new Error('Network error - no response from server');
        } 
        else {
            throw new Error('Request failed to be created');
        }
    }
}

export const createEmail = async (data: any) => {
    try {
        const response = await axios.post(`${API_URL}/api/email/addEmailTemplate`, data)
        return response.data
    } catch (error) {
        const axiosError = error as AxiosError<ErrorResponse>
        if (axiosError.response) {
            throw new Error(axiosError.response.data.error)
        }
        else if (axiosError.request) {
            throw new Error('Network error - no response from server');
        } 
        else {
            throw new Error('Request failed to be created');
        }
    }
}

export const editEmail = async (data: any, id: string) => {
    try {
        const response = await axios.put(`${API_URL}/api/email/editEmailTemplate/${id}`, data)
        return response.data
    } catch (error) {
        const axiosError = error as AxiosError<ErrorResponse>
        if (axiosError.response) {
            throw new Error(axiosError.response.data.error)
        }
        else if (axiosError.request) {
            throw new Error('Network error - no response from server');
        } 
        else {
            throw new Error('Request failed to be created');
        }
    }
}

export const deleteEmail = async (id: string) => {
    try {
        const response = await axios.delete(`${API_URL}/api/email/deleteEmailTemplate/${id}`)
        return response.data
    } catch (error) {
        const axiosError = error as AxiosError<ErrorResponse>
        if (axiosError.response) {
            throw new Error(axiosError.response.data.error)
        }
        else if (axiosError.request) {
            throw new Error('Network error - no response from server');
        } 
        else {
            throw new Error('Request failed to be created');
        }
    }
}
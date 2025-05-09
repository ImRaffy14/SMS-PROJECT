import axios, { AxiosError } from "axios"
import {  ErrorResponse } from "../types"

const urlAPI = import.meta.env.VITE_SERVER_URL

export const getGradingSystem = async () => {
    try {
        const result = await axios.get(`${urlAPI}/api/gradingSystem`)
        return result.data.gradingSystem
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

export const createGradingSystem = async (data: any) => {
    try {
        const result = await axios.post(`${urlAPI}/api/gradingSystem/addGradingSystem`, data)
        return result.data
    } catch (error) {
        const axiosError = error as AxiosError<ErrorResponse>
        
        if(axiosError.response){
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

export const deleteGradingSystem = async (id: string) => {
    try {
        const result = await axios.delete(`${urlAPI}/api/gradingSystem/deleteGradingSystem/${id}`)
        return result.data
    } catch (error) {
        const axiosError = error as AxiosError<ErrorResponse>
        
        if(axiosError.response){
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
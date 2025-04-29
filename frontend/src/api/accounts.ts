import axios, { AxiosError } from "axios"
import { UsersResponse, User } from "../types"

const urlAPI = import.meta.env.VITE_SERVER_URL

export const getUsers = async (): Promise<User[]> => {
    try {
        const result = await axios.get<UsersResponse>(`${urlAPI}/api/account/users`)
        return result.data.data
    } catch (error) {
        const axiosError = error as AxiosError
        if (axiosError.request) {
            throw new Error('Network error - no response from server');
        } 
        else {
            throw new Error('Request failed to be created');
        }
    }
}
import axios, { AxiosError } from 'axios';
import { Announcement, ErrorResponse } from '../types';

const urlAPI = import.meta.env.VITE_SERVER_URL;

export const getAnnouncements = async () => {
    try {
        const result = await axios.get(`${urlAPI}/api/announcement`);
        return result.data.announcements;
    } catch (error) {
        const axiosError = error as AxiosError<ErrorResponse>;
        if (axiosError.request) {
            throw new Error('Network error - no response from server');
        } else {
            throw new Error('Request failed to be created');
        }
    }
};

export const createAnnouncement = async (data: Announcement) => {
    try {
        const result = await axios.post(`${urlAPI}/api/announcement/createAnnouncement`, data);
        return result.data;
    } catch (error) {
        const axiosError = error as AxiosError<ErrorResponse>;
        if (axiosError.response) {
            throw new Error(axiosError.response.data.error);
        } else if (axiosError.request) {
            throw new Error('Network error - no response from server');
        } else {
            throw new Error('Request failed to be created');
        }
    }
}

export const editAnnouncement = async (data: Announcement, id: string) => {
    try {
        const result = await axios.put(`${urlAPI}/api/announcement/editAnnouncement/${id}`, data);
        return result.data;
    } catch (error) {
        const axiosError = error as AxiosError<ErrorResponse>;
        if (axiosError.response) {
            throw new Error(axiosError.response.data.error);
        } else if (axiosError.request) {
            throw new Error('Network error - no response from server');
        } else {
            throw new Error('Request failed to be created');
        }
    }
};

export const deleteAnnouncement = async (id: string) => {
    try {
        const result = await axios.delete(`${urlAPI}/api/announcement/deleteAnnouncement/${id}`);
        return result.data;
    } catch (error) {
        const axiosError = error as AxiosError<ErrorResponse>;
        if (axiosError.response) {
            throw new Error(axiosError.response.data.error);
        } else if (axiosError.request) {
            throw new Error('Network error - no response from server');
        } else {
            throw new Error('Request failed to be created');
        }
    }
};
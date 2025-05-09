import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import {
    createGradingSystem,
    deleteGradingSystem,
} from "../api/gradingSystem";
import { GradingSystem } from "../types";

export const useCreateGradingSystem = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: any) => createGradingSystem(data),
        onSuccess: (response) => {
            const { gradingSystem } = response;

            queryClient.setQueryData(['gradingSystems'], (oldGradingSystem: GradingSystem[]) =>
                oldGradingSystem
                    ? [...oldGradingSystem, gradingSystem]
                    : [gradingSystem]
            );

            toast.success(response.message);
        },
        onError: (error: Error) => {
            console.error('Create Grading System Error:', {
                message: error.message,
                time: new Date().toISOString(),
                stack: error.stack,
            });
            toast.error(error.message);
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ['gradingSystems'] });
        },
    })
}

export const useDeleteGradingSystem = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => deleteGradingSystem(id),
        onSuccess: (response) => {
            const { gradingSystem } = response;

            queryClient.setQueryData(['gradingSystems'], (oldGradingSystem: GradingSystem[]) =>
                oldGradingSystem
                    ? oldGradingSystem.filter((oldGradingSystem) => oldGradingSystem.id !== gradingSystem.id)
                    : [gradingSystem]
            );

            toast.success(response.message);
        },
        onError: (error: Error) => {
            console.error('Delete Grading System Error:', {
                message: error.message,
                time: new Date().toISOString(),
                stack: error.stack,
            });
            toast.error(error.message);
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ['gradingSystems'] });
        },
    })
}
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import {
    createEmail,
    editEmail,
    deleteEmail
} from "@/api/email";
import { Email } from "@/types";

export const useCreateEmail = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: any) => createEmail(data),
        onSuccess: (response) => {
            const { data } = response;
            queryClient.setQueryData(['emails'], (oldEmails: Email[]) =>
                oldEmails ? [...oldEmails, data] : [data]
            );

            toast.success(response.message);
        },
        onError: (error: Error) => {
            console.error('Create Email Error:', {
                message: error.message,
                time: new Date().toISOString(),
                stack: error.stack,
            });
            toast.error(error.message);
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ['emails'] });
        },
    });
}

export const useEditEmail = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ data, id }: { data: any; id: string }) => editEmail(data, id),
        onSuccess: (response) => {
            const { data } = response;

            queryClient.setQueryData(['emails'], (oldEmails: any[]) =>
                oldEmails
                    ? oldEmails.map((oldEmail) =>
                        oldEmail.id === data.id ? { ...oldEmail, ...data } : oldEmail
                    )
                    : [data]
            );

            toast.success(response.message);
        },
        onError: (error: Error) => {
            console.error('Edit Email Error:', {
                message: error.message,
                time: new Date().toISOString(),
                stack: error.stack,
            });
            toast.error(error.message);
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ['emails'] });
        },
    });
}

export const useDeleteEmail = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => deleteEmail(id),
        onSuccess: (response) => {
            const { data } = response;

            queryClient.setQueryData<Email[]>(['emails'], (oldEmails) =>
            oldEmails?.filter((oldEmail) => oldEmail && oldEmail.id !== data.id) ?? []
            );


            toast.success(response.message);
        },
        onError: (error: Error) => {
            console.error('Delete Email Error:', {
                message: error.message,
                time: new Date().toISOString(),
                stack: error.stack,
            });
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ['emails'] });
        },
    });
}



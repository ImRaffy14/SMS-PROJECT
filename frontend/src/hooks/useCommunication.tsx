import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { 
    createAnnouncement,
    editAnnouncement,
    deleteAnnouncement 
} from "@/api/announcement";
import { Announcement } from "@/types";


export const useCreateAnnouncement = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: Announcement) => createAnnouncement(data),
        onSuccess: (response) => {
            const { announcement } = response;

            queryClient.setQueryData(['announcements'], (oldAnnouncements: any[]) =>
                oldAnnouncements ? [...oldAnnouncements, announcement] : [announcement]
            );

            toast.success(response.message);
        },
        onError: (error: Error) => {
            console.error('Create Announcement Error:', {
                message: error.message,
                time: new Date().toISOString(),
                stack: error.stack,
            });
            toast.error(error.message);
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ['announcements'] });
        },
    });
}

export const useEditAnnouncement = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ data, id }: { data: Announcement; id: string }) => editAnnouncement(data, id),
        onSuccess: (response) => {
            const { announcement } = response;

            queryClient.setQueryData(['announcements'], (oldAnnouncements: any[]) =>
                oldAnnouncements
                    ? oldAnnouncements.map((oldAnnouncement) =>
                        oldAnnouncement.id === announcement.id ? { ...oldAnnouncement, ...announcement } : oldAnnouncement
                    )
                    : [announcement]
            );

            toast.success(response.message);
        },
        onError: (error: Error) => {
            console.error('Edit Announcement Error:', {
                message: error.message,
                time: new Date().toISOString(),
                stack: error.stack,
            });
            toast.error(error.message);
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ['announcements'] });
        },
    });
}

export const useDeleteAnnouncement = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => deleteAnnouncement(id),
        onSuccess: (response) => {
            const { announcement } = response;

            queryClient.setQueryData(['announcements'], (oldAnnouncements: any[]) =>
                oldAnnouncements ? oldAnnouncements.filter((oldAnnouncement) => oldAnnouncement.id !== announcement.id) : []
            );

            toast.success(response.message);
        },
        onError: (error: Error) => {
            console.error('Delete Announcement Error:', {
                message: error.message,
                time: new Date().toISOString(),
                stack: error.stack,
            });
            toast.error(error.message);
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ['announcements'] });
        },
    });
}
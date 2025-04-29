
export type LoaderProps = {
    message: string;
    showLogo: boolean;
};

export interface Login {
    email: string;
    password: string;
}

export interface NewUser {
    name: string;
    email: string;
    password: string;
    role: string;
}

export interface User {
    id: string;
    name: string;
    email: string;
    role: string;
    image: {
        imageUrl: string;
        publicId: string;
    }
    createdAt: string;
    updatedAt: string;
}

export interface UsersResponse {
    status: 'success';
    data: User[];
}

export interface ErrorResponse {
    error: string;
    errors?: Record<string, string[]>;
}

export interface MutationContext {
    previousUser?: User | null;
    previousUsers?: User[] | null;
}

export type PaginationControlsProps = {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    className?: string;
    previousLabel?: string;
    nextLabel?: string;
};
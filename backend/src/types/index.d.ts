export interface JWTPayload {
    userId: string;
    email: string;
}

export interface RegisterUser {
    name: string;
    email: string;
    password: string;
    role: string;
    department: string;
    image: Image;
}

export interface Image {
    imageUrl: string;
    publicId: string;
}

export interface LoginUser {
    email: string;
    password: string;
}

export interface User extends RegisterUser {
    id: string;
}

export interface EditUser {
    imagePublicId?: string;
    imageUrl?: string;
    name?: string;
    email?: string;
    role?: string;
}

export interface GradingSystem {
    id?: string;
    name: string;
    description: string;
    type: string;
    scale: string;
    passingGrade: string;
    isDefault: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export interface Email {
    id?: string;
    name: string;
    type: string;
    message: string;
    status: string;
}

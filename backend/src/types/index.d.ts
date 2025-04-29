export interface JWTPayload {
    userId: string;
    email: string;
}

export interface RegisterUser {
    name: string;
    email: string;
    password: string;
    role: string;
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
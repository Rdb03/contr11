export interface IUser {
    _id: string;
    username: string;
    password: string;
    token: string;
}

export interface Commodity {
    _id: string,
    title: string,
    description: string,
    price: number,
    image: string | null,
    category: string,
    user: IUser
}

export interface CommodityInfo {
    title: string,
    description: string,
    price: number,
    image: string | null,
    category: string,
    user: {
        displayName: string,
        phone: string,
        _id: string,
    }
}

export interface RegisterResponse {
    user: User;
    message: string;
}

export interface ValidationError {
    errors: {
        [key: string]: {
            name: string;
            message: string;
        }
    },
    message: string;
    name: string;
    _message: string;
}

export interface RegisterMutation {
    username: string;
    password: string;
}

export interface LoginMutation {
    username: string;
    password: string;
}

export interface GlobalError {
    error: string;
}
export interface CommodityMutation {
    title: string;
    description: string;
    image: File | null;
    price: string;
    category: string;
}
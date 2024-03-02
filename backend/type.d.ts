    export interface IUser {
        username: string;
        password: string;
        token: string;
        displayName: string;
        phone: string;
    }

export interface Commodity {
    title: string;
    description: string;
    price: string;
    image: string | null;
    category: string;
    seller: IUser;
    isSold: boolean;
}

export interface UserFields {
    username: string;
    password: string;
    token: string;
    displayName: string,
    phone: string,
}

interface UserMethods {
    checkPassword(password: string): Promise<boolean>;
    generateToken(): void;
}

type UserModel = Model<UserFields, {}, UserMethods>;
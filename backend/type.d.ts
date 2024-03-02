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
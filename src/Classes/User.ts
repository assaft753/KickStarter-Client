export class User implements IUser {
    user_id: number;
    is_admin: number;
    user_name: String;
    password: String;
    constructor(user_name: String, password: String, is_admin: number = 0) {
        this.user_name = user_name;
        this.password = password;
        this.is_admin = is_admin;
    }
}

export interface IUser {
    user_id: number;
    user_name: String;
    password: String;
    is_admin: number;
}
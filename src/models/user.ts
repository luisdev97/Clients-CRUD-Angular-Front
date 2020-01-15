export class User {
    id: number;
    username: string;
    password: string;
    name: string;
    surname: string;
    email: string;
    roles: Array<string> = [];
}

export default interface User {
    uid?: string;
    firstName: string;
    lastName: string;
    email: string;
    password?: string;
    isAdmin?: boolean;
}
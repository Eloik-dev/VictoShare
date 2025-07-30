export default interface User {
    id: number;
    username: string;
    email: string;
    is_guest: boolean;
    guest_expires_at: string | null;
    created_at: string;
    updated_at: string;
}
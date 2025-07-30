import type User from "./User";

export type History = {
    id: number,
    user_id: number | null,
    resource_id: number,
    ip_address: string | null,
    user_agent: string | null,
    created_at: string,

    user: User | null
};
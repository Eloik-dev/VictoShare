import type User from "./User";

/**
 * Type d'un enregistrement de l'historique des ressources
 */
export type History = {
    id: number,
    user_id: number | null,
    resource_id: number,
    ip_address: string | null,
    user_agent: string | null,
    created_at: string,

    user: User | null
};
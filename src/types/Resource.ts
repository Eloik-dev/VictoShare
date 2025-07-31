/**
 * Enum des types de ressources
 */
export const ResourceType = {
    link: 0,
    file: 1,
}

/**
 * Informations sur une ressource de type fichier
 */
export type ResourceInfo = {
    filename: string,
    size: number,
    mimetype: string
}

/**
 * Type d'une ressource
 */
export type Resource = {
    id: number,
    token: string,
    type: number,
    value: string,
    created_at: string,

    info?: ResourceInfo
};
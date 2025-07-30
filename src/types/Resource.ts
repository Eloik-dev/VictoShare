export const ResourceType = {
    link: 0,
    file: 1,
}

export type ResourceInfo = {
    filename: string,
    size: number,
    mimetype: string
}

export type Resource = {
    id: number,
    token: string,
    type: number,
    value: string,
    created_at: string,

    info?: ResourceInfo
};
import { createContext, useState } from "react";
import useRequest from "../hooks/useRequest";
import { ApiPaths } from "../constants/ApiPaths";

export interface IResourceContext {
    isFilesDownload: boolean;
    setIsFilesDownload: (value: boolean) => void;
    files: File[] | null;
    setFiles: (files: File[]) => void;
    link: string | null;
    setLink: (link: string) => void;
    currentToken: string | null;
    generate: () => Promise<string>;
    validate: () => boolean;
}

export const ResourceContext = createContext<IResourceContext>({
    isFilesDownload: false,
    setIsFilesDownload: () => { },
    files: null,
    setFiles: () => { },
    link: null,
    setLink: () => { },
    currentToken: null,
    generate: async () => '',
    validate: () => false
});

/**
 * Contexte pour la gestion des ressources partagées
 */
export const ResourceProvider = ({ children }: { children: React.ReactNode }) => {
    const { post } = useRequest();

    const [isFilesDownload, setIsFilesDownload] = useState<boolean>(true);
    const [files, setFiles] = useState<File[] | null>(null);
    const [link, setLink] = useState<string | null>(null);
    const [currentToken, setCurrentToken] = useState<string | null>(null);

    /**
     * Génère un lien de partage de ressources à l'aide des informations du contexte
     * @returns Le token de partage 
     */
    const generate = async (): Promise<string> => {
        if (!validate()) {
            console.error("Resource invalide");
            return "";
        }

        const formData = new FormData();
        if (files && isFilesDownload) {
            files.forEach(file => formData.append('files[]', file));
        } else if (link) {
            formData.append('link', link);
        }

        // Add the current token to reset it instead of creating a new one
        if (currentToken) {
            formData.append('oldToken', currentToken);
        }

        const result = await post(ApiPaths.resource.generate, formData);
        if (!result.token) {
            console.error(result);
            return '';
        }

        setCurrentToken(result.token);
        return result.token;
    }

    /**
     * Vérifie si la ressource à générer est valide
     * @returns Vrai si la ressource est valide
     */
    const validate = (): boolean => {
        if (isFilesDownload) {
            return files !== null && files.length > 0;
        }

        return link !== null && link.length > 0;
    }

    return (
        <ResourceContext.Provider
            value={{
                isFilesDownload,
                setIsFilesDownload,
                files,
                setFiles,
                link,
                setLink,
                currentToken,
                generate,
                validate
            }}
        >
            {children}
        </ResourceContext.Provider>
    );
}
import { createContext, useState } from "react";

export interface IResourceContext {
    isFilesDownload: boolean;
    setIsFilesDownload: (value: boolean) => void;
    files: File[] | null;
    setFiles: (files: File[]) => void;
    link: string | null;
    setLink: (link: string) => void;
}

export const ResourceContext = createContext<IResourceContext>({
    isFilesDownload: false,
    setIsFilesDownload: () => { },
    files: null,
    setFiles: () => { },
    link: null,
    setLink: () => { }
});

export const ResourceProvider = ({ children }: { children: React.ReactNode }) => {
    const [isFilesDownload, setIsFilesDownload] = useState<boolean>(false);
    const [files, setFiles] = useState<File[] | null>(null);
    const [link, setLink] = useState<string | null>(null);

    return (
        <ResourceContext.Provider value={{ isFilesDownload, setIsFilesDownload, files, setFiles, link, setLink }}>
            {children}
        </ResourceContext.Provider>
    );
}
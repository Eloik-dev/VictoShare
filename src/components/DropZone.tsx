import { useResources } from "@/hooks/useResources";
import { type FC } from 'react';
import { FilePond, registerPlugin } from 'react-filepond';
import type { FilePondFile } from "filepond";
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import FilePondPluginPdfPreview from 'filepond-plugin-pdf-preview';
import FilePondPluginGetFile from 'filepond-plugin-get-file';
import FilePondPluginFileValidateSize from 'filepond-plugin-file-validate-size';

import 'filepond/dist/filepond.min.css';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
import "filepond-plugin-pdf-preview/dist/filepond-plugin-pdf-preview.min.css";
import 'filepond-plugin-get-file/dist/filepond-plugin-get-file.min.css';

registerPlugin(FilePondPluginImagePreview);
registerPlugin(FilePondPluginPdfPreview);
registerPlugin(FilePondPluginGetFile);
registerPlugin(FilePondPluginFileValidateSize);

/**
 * Composante pour ajouter des fichiers à la liste des ressources partagées
 */
const DropZone: FC = () => {
    const { files, setFiles } = useResources();

    /**
     * Met à jour la liste des fichiers locaux téléversés
     * @param files Fichiers téléversés
     */
    const handleAddFiles = (uploaded: FilePondFile[]) => {
        const filesList: File[] = [];

        uploaded.forEach(file => {
            if (file.file) {
                filesList.push(file.file as File);
            }
        });
        setFiles(filesList);
    };

    return (
        <FilePond
            allowMultiple={true}
            onupdatefiles={handleAddFiles}
            storeAsFile files={files || []}
            maxFiles={15}
            labelIdle="Cliquez ici ou déposez des fichiers en les glissant"
        />
    )

}

export default DropZone;
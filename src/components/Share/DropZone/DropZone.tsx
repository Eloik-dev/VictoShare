import { useCallback, useEffect, useMemo, useState, type FC } from "react";
import { useDropzone, type FileRejection } from "react-dropzone";
import styles from './DropZone.module.scss';
import { useResources } from "@/hooks/useResources";
import FileList from "../FileList";

/**
 * Composante pour l'importation de documents
 * Inspiré de @link https://react-dropzone.js.org/
 */
const DropZone: FC = () => {
    const { files, setFiles, validate } = useResources();

    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (files === null || files.length === 0 || validate()) {
            return;
        };

        setError("Une erreur inconnue est survenue, veuillez recommencer.");
    }, [files]);

    /**
     * Au dépôt d'un fichier, mettre à jour la liste
     */
    const onDrop = useCallback((acceptedFiles: File[]) => {
        setFiles(acceptedFiles);
        setError(null);
    }, [])

    /**
     * Si un fichier n'est pas accepté, afficher une erreur
     */
    const onDropRejected = useCallback((rejectedFiles: FileRejection[]) => {
        setError(`Les fichiers suivants ne sont pas acceptés: ${rejectedFiles.map(f => f.file.name).join(', ')}`)
    }, [])

    const {
        getRootProps,
        getInputProps,
        isFocused,
        isDragActive,
        isDragAccept,
        isDragReject
    } = useDropzone({
        onDrop,
        onDropRejected,
        onError: () => setError("Une erreur inconnue est survenue, veuillez recommencer."),
        accept: {
            'image/*': ['.png', '.jpg', '.jpeg', '.gif'],
            'application/pdf': ['.pdf'],
            'application/msword': ['.doc', '.docx'],
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
            'application/vnd.ms-powerpoint': ['.ppt', '.pptx'],
            'application/vnd.openxmlformats-officedocument.presentationml.presentation': ['.pptx'],
            'application/vnd.oasis.opendocument.presentation': ['.odp'],
            'application/vnd.oasis.opendocument.spreadsheet': ['.ods'],
            'application/vnd.oasis.opendocument.text': ['.odt'],
            'application/zip': ['.zip'],
            'application/x-rar-compressed': ['.rar'],
        }
    });

    const styleClass = useMemo(() => {
        if (isFocused) return styles.focused
        if (isDragAccept) return styles.accepted
        if (isDragReject) return styles.rejected
        return '';
    }, [
        isFocused,
        isDragAccept,
        isDragReject
    ]);

    return (
        <>
            <div {...getRootProps()} id={styles['dropZone']} className={styleClass}>
                <input {...getInputProps()} />
                {
                    isDragActive ?
                        <p>Déposez ici...</p> :
                        <p>Déposez des fichiers ici en les glissant, ou cliquez pour sélectionner des fichiers</p>
                }
            </div>
            {
                error && <p className='error'>{error}</p>
            }
            {
                files && files.length > 0 && <FileList />
            }
        </>
    )
}

export default DropZone;


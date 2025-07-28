import { useCallback, useMemo, type FC } from "react";
import { useDropzone } from "react-dropzone";
import styles from './DropZone.module.scss';
import { useResources } from "../../hooks/useResources";
import FileList from "../FileList/FileList";

/**
 * Inspiré de @link https://react-dropzone.js.org/
 */
const DropZone: FC = () => {
    const { files, setFiles } = useResources();

    const onDrop = useCallback((acceptedFiles: File[]) => {
        setFiles(acceptedFiles);
    }, [])

    const {
        getRootProps,
        getInputProps,
        isFocused,
        isDragActive,
        isDragAccept,
        isDragReject
    } = useDropzone({
        onDrop
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
                files && files.length > 0 && <FileList />
            }
        </>
    )
}

export default DropZone;


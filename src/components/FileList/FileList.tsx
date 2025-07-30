import styles from './FileList.module.scss';
import { useResources } from "../../hooks/useResources";
import { useMemo, type FC } from 'react';
import FileUtils from '../../utils/FileUtils';

/**
 * Inspiré de @link https://react-dropzone.js.org/
 */
const FileList: FC = () => {
    const { files } = useResources();

    if (!files || files.length === 0) return <></>;

    const fileList = useMemo(() => files.map(
        (file) => (
            <li key={file.name}>{`${file.name} - ${FileUtils.convertBytesToString(file.size)}`}</li>
        )
    ), [files]);

    return (
        <aside id={styles['fileList']}>
            <h2>{files.length <= 1 ? 'Fichier téléversé' : 'Fichiers téléversés'}</h2>
            <ul>{fileList}</ul>
        </aside>
    )
}

export default FileList;


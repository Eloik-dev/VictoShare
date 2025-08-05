import { useEffect, useState, type FC } from 'react';
import { Box, IconButton, Tooltip, Typography } from '@mui/material';
import type { History } from '@/types/History';
import type { Resource } from '@/types/Resource';
import { MaterialReactTable, type MRT_ColumnDef } from 'material-react-table';
import useRequest from '@/hooks/useRequest';
import { ApiPaths } from '@/constants/ApiPaths';
import DateTimeUtils from '@/utils/DateTimeUtils';
import { Delete } from '@mui/icons-material';
import type { IConfirmationPopup } from '../ConfirmationPopup';
import ConfirmationPopup from '../ConfirmationPopup';
import { toast } from 'react-toastify';

interface IHistoryTable {
    resource: Resource
}

/**
 * Tableau de l'historique d'une ressource  
 */
const HistoryTable: FC<IHistoryTable> = ({ resource }) => {
    const { get, remove } = useRequest();

    const [history, setHistory] = useState<History[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const [confirmationPopup, setConfirmationPopup] = useState<IConfirmationPopup>({
        open: false,
        title: '',
        description: '',
        onConfirm: () => { },
        onClose: () => { }
    });

    /**
     * Définition des colonnes du tableau
     */
    const columns: MRT_ColumnDef<History>[] = [
        {
            header: 'Utilisateur (peut-être anonyme)',
            Cell: ({ row }) => (
                <Typography>
                    {row.original.user?.username || 'Anonyme'}
                </Typography>
            )
        },
        {
            header: 'Adresse IP',
            Cell: ({ row }) => (
                <Typography>
                    {row.original.ip_address}
                </Typography>
            )
        },
        {
            header: 'Navigateur',
            Cell: ({ row }) => (
                <Typography>
                    {row.original.user_agent}
                </Typography>
            )
        },
        {
            header: 'Date de consultation',
            Cell: ({ row }) => (
                <Typography>
                    {DateTimeUtils.getDateTimeString(new Date(row.original.created_at))}
                </Typography>
            )
        },
        {
            header: 'Actions',
            Cell: ({ row }) => (
                <Tooltip title="Supprimer l'historique" arrow>
                    <IconButton onClick={() => handleDeleteHistory(row.original)}>
                        <Delete />
                    </IconButton>
                </Tooltip>
            ),
        },
    ];

    useEffect(() => {
        refreshHistory();
    }, [])

    /**
     * Rafraîchissement de la liste des ressources
     */
    const refreshHistory = async () => {
        setLoading(true);

        try {
            const response = await get(`${ApiPaths.history.getForResource}/${resource.id}`);
            if (response?.histories) {
                setHistory(response.histories);
            }
        } catch (error) {
            toast.error('Erreur lors du chargement de l\'historique');
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    /**
     * Effectu un appel pour supprimer un historique
     * @param history L'historique à supprimer
     */
    const handleDeleteHistory = async (history: History) => {

        const onConfirm = async () => {
            setLoading(true);
            resetConfirmationPopup();

            try {
                const response = await remove(`${ApiPaths.history.delete}/${history.id}`);
                if (response) {
                    await refreshHistory();
                }
            } catch (error) {
                toast.error('Erreur lors de la suppression de l\'historique');
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        setConfirmationPopup({
            open: true,
            title: 'Suppression de l\'historique',
            description: 'Cet historique ne sera plus visible. Êtes-vous sur de vouloir le supprimer?',
            onConfirm: onConfirm,
            onClose: resetConfirmationPopup
        });
    }

    /**
     * Efface le popup de confirmation
     */
    const resetConfirmationPopup = () => {
        setConfirmationPopup(prev => ({
            ...prev,
            open: false
        }));
    }

    return (
        <>
            <MaterialReactTable
                columns={columns}
                data={history}
                state={{ isLoading: loading }}
                enablePagination={false}
                enableFilters={false}
                enableDensityToggle={false}
                enableHiding={false}
                enableFullScreenToggle={false}
                localization={{
                    noRecordsToDisplay: 'Aucun historique trouvé',
                    noResultsFound: 'Aucune historique trouvé',
                }}
                renderTopToolbarCustomActions={() => (
                    <Typography variant="h6" component="div" padding={1}>
                        Historique d'utilisation de la ressource
                    </Typography>
                )}
            />

            <ConfirmationPopup {...confirmationPopup} />
        </>
    );
};

export default HistoryTable;
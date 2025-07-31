import { useEffect, useState, type FC } from 'react';
import { Typography } from '@mui/material';
import type { History } from '@/types/History';
import type { Resource } from '@/types/Resource';
import { MaterialReactTable, type MRT_ColumnDef } from 'material-react-table';
import useRequest from '@/hooks/useRequest';
import { ApiPaths } from '@/constants/ApiPaths';
import DateTimeUtils from '@/utils/DateTimeUtils';

interface IHistoryTable {
    resource: Resource
}

/**
 * Tableau de l'historique d'une ressource  
 */
const HistoryTable: FC<IHistoryTable> = ({ resource }) => {
    const { get } = useRequest();

    const [history, setHistory] = useState<History[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

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
            const response = await get(`${ApiPaths.resource.history}/${resource.id}`);
            if (response?.histories) {
                setHistory(response.histories);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <MaterialReactTable
            columns={columns}
            data={history}
            state={{ isLoading: loading }}
            enablePagination={false}
            enableFilters={false}
            enableDensityToggle={false}
            enableRowVirtualization={false}
            localization={{
                noRecordsToDisplay: 'Aucun historique trouvé',
                noResultsFound: 'Aucune historique trouvé',
            }}
            renderTopToolbarCustomActions={() => (
                <Typography variant="h6" component="div" sx={{ padding: 1, flex: 1 }}>
                    Historique
                </Typography>
            )}
        />
    );
};

export default HistoryTable;
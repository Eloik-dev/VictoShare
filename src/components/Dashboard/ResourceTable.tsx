import { MaterialReactTable, type MRT_ColumnDef } from 'material-react-table';
import { Box, IconButton, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { ResourceType, type Resource } from '@/types/Resource';
import HistoryTable from '@/components/Dashboard/HistoryTable';
import { ApiPaths } from '@/constants/ApiPaths';
import useRequest from '@/hooks/useRequest';
import DateTimeUtils from '@/utils/DateTimeUtils';
import { Paths } from '@/constants/Paths';
import LinkCopyToClipboard from '@/components/LinkCopyToClipboard';
import { Delete } from '@mui/icons-material';
import type { IConfirmationPopup } from '../ConfirmationPopup';
import ConfirmationPopup from '../ConfirmationPopup';

/**
 * Composante pour l'affichage dans un tableau des ressources partagées d'un utilisateur 
 */
const ResourceTable = () => {
    const { get, remove } = useRequest();

    const [resources, setResources] = useState<Resource[]>([]);
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
    const columns: MRT_ColumnDef<Resource>[] = [
        {
            header: 'Code d\'accès',
            Cell: ({ row }) => (
                <Box display={"flex"} gap={1} alignItems={"center"} maxWidth={"25rem"}>
                    <LinkCopyToClipboard link={`${window.location.origin}${Paths.access}/${row.original.token}`} displayText={row.original.token} />
                </Box>
            ),
        },
        {
            header: 'Type',
            Cell: ({ row }) => (
                <Typography>
                    {row.original.type == ResourceType.link ? 'Lien de redirection' : 'Transfert de document'}
                </Typography>
            ),
        },
        {
            header: 'Valeur',
            Cell: ({ row }) => (
                <Typography>
                    {row.original.type == ResourceType.link ? row.original.value : row.original.value.split('/').pop()}
                </Typography>
            ),
        },
        {
            header: 'Date de création',
            Cell: ({ row }) => (
                <Typography>
                    {DateTimeUtils.getDateTimeString(new Date(row.original.created_at))}
                </Typography>
            ),
        },
        {
            header: 'Actions',
            Cell: ({ row }) => (
                <Box display="flex" gap={1}>
                    <IconButton onClick={() => handleDeleteResource(row.original)}>
                        <Delete />
                    </IconButton>
                </Box>
            ),
        },
    ];

    useEffect(() => {
        refreshResources();
    }, [])

    /**
     * Effectu un appel pour rafraîchir la liste des ressources
     */
    const refreshResources = async () => {
        setLoading(true);

        try {
            const response = await get(ApiPaths.resource.getAll);
            if (response?.resources) {
                setResources(response.resources);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    /**
     * Effectu un appel pour supprimer une ressource
     * @param resource La ressource à supprimer
     */
    const handleDeleteResource = async (resource: Resource) => {

        const onConfirm = async () => {
            setLoading(true);
            resetConfirmationPopup();

            try {
                const response = await remove(`${ApiPaths.resource.delete}/${resource.id}`);
                if (response) {
                    await refreshResources();
                }
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        setConfirmationPopup({
            open: true,
            title: 'Suppression de la ressource',
            description: 'Etes-vous sur de vouloir supprimer cette ressource ?',
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
                data={resources}
                state={{
                    isLoading: loading,
                    showSkeletons: loading,
                    showLoadingOverlay: false,
                }}
                muiTablePaperProps={{ sx: { flex: 1, display: 'flex', flexDirection: 'column' } }}
                muiTableContainerProps={{ sx: { flex: 1, overflow: 'auto' } }}
                enablePagination={false}
                enableFilters={false}
                enableDensityToggle={false}
                enableExpandAll={false}
                enableTableFooter={false}
                enableBottomToolbar={false}
                enableStickyHeader
                enableExpanding
                localization={{
                    noRecordsToDisplay: 'Aucune ressource trouvée',
                }}
                renderTopToolbarCustomActions={() => (
                    <Typography variant="h6" margin={1}>
                        Ressources trouvées : {resources.length}
                    </Typography>
                )}
                renderDetailPanel={({ row }) => (
                    <HistoryTable resource={row.original} />
                )}
                muiDetailPanelProps={{
                    sx: {
                        padding: 0,
                    },
                }}
            />
            <ConfirmationPopup {...confirmationPopup} />
        </>
    );
};

export default ResourceTable;

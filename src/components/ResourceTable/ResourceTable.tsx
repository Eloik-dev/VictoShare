import { MaterialReactTable, type MRT_ColumnDef } from 'material-react-table';
import { Box, IconButton, Link, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { ResourceType, type Resource } from '../../types/Resource';
import HistoryTable from '../HistoryTable/HistoryTable';
import { ApiPaths } from '../../constants/ApiPaths';
import useRequest from '../../hooks/useRequest';
import DateTimeUtils from '../../utils/DateTimeUtils';
import { Paths } from '../../constants/Paths';
import LinkCopyToClipboard from '../LinkCopyToClipboard/LinkCopyToClipboard';

const ResourceTable = () => {
    const { get } = useRequest();

    const [resources, setResources] = useState<Resource[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

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
    ];

    useEffect(() => {
        refreshResources();
    }, [])

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

    return (
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
    );
};

export default ResourceTable;

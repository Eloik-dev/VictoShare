import { ApiPaths } from "@/constants/ApiPaths";
import { Paths } from "@/constants/Paths";
import useRequest from "@/hooks/useRequest";
import { ResourceType, type Resource } from "@/types/Resource";
import FileUtils from "@/utils/FileUtils";
import { Download } from "@mui/icons-material";
import { Backdrop, Box, Button, CircularProgress, IconButton, Link, Typography } from "@mui/material";
import { useEffect, useMemo, useState, type FC } from "react";
import { useNavigate } from "react-router";

interface IResourceStatus {
    token: string;
}

const ResourceStatus: FC<IResourceStatus> = ({ token }) => {
    const { get } = useRequest();
    const navigate = useNavigate();

    const [resource, setResource] = useState<Resource | null>(null);

    const returnButton = useMemo(() => <Button variant="outlined" onClick={() => navigate(Paths.share)}>Retourner</Button>, []);

    useEffect(() => {
        handleGetResource();
    }, []);

    const handleGetResource = async () => {
        const resource = await get(`${ApiPaths.resource.get}/${token}`);
        setResource(resource);

        if (resource.type === ResourceType.link) {
            window.location.href = `${ApiPaths.resource.access}/${token}`;
        }
    }

    if (resource === null) {
        return (
            <>
                <Typography variant="h5">Récupération de la ressource...</Typography>
                <CircularProgress />
                {returnButton}
            </>
        )
    }

    if (resource.type === ResourceType.link) {
        return (
            <>
                <Typography variant="h5">Redirection en cours...</Typography>
                <CircularProgress />
                <Typography variant="body1">La redirection ne marche pas ? <Link href={resource.value} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>Cliquez ici</Link></Typography>
                {returnButton}
            </>
        )
    }

    if (resource.type === ResourceType.file) {
        return (
            <>
                <Typography variant="h5">Votre téléchargement est prêt!</Typography>
                {resource.info &&
                    <Box>
                        <Typography variant="body1">Nom du fichier: <b>{resource.value.split('/').pop()}</b></Typography>
                        <Typography variant="body1">Taille du fichier: {FileUtils.convertBytesToString(resource.info.size)}</Typography>
                        <Typography variant="body1">Type du fichier: {resource.info.mimetype.toUpperCase()}</Typography>
                    </Box>
                }
                <Box display={"flex"} flexDirection={"column"} gap={2}>
                    <Button variant="contained" target="_blank" href={`${ApiPaths.resource.access}/${token}`} >
                        <Box display={"flex"} alignItems={"center"} gap={1}>
                            <Download />
                            Télécharger
                        </Box>
                    </Button>
                    {returnButton}
                </Box>
            </>
        )
    }
}

export default ResourceStatus;
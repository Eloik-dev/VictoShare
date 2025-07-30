import { Box, Button, CircularProgress, Container, Link, Typography } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import useRequest from "../hooks/useRequest";
import { ApiPaths } from "../constants/ApiPaths";
import { useNavigate, useParams } from "react-router";
import { ResourceType, type Resource } from "../types/Resource";
import { Paths } from "../constants/Paths";
import DateTimeUtils from "../utils/DateTimeUtils";
import FileUtils from "../utils/FileUtils";

const Access = () => {
    const { get } = useRequest();
    const navigate = useNavigate();
    const { token } = useParams<{ token: string }>();

    const [resource, setResource] = useState<Resource | null>(null);

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

    const returnButton = useMemo(() => <Button variant="outlined" onClick={() => navigate(Paths.share)}>Retourner</Button>, []);

    const status = useMemo(() => {
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
                        <Link target="_blank" href={`${ApiPaths.resource.access}/${token}`} style={{ textDecoration: "none" }}>
                            <Button variant="contained">
                                Télécharger le fichier
                            </Button>
                        </Link>
                        {returnButton}
                    </Box>
                </>
            )
        }
    }, [resource]);

    return (
        <Container maxWidth="sm" sx={{ marginTop: "10rem" }}>
            <Box display={"flex"} flexDirection={"column"} alignItems={"center"} gap={5}>
                {status}
            </Box>
        </Container>
    );
};

export default Access;


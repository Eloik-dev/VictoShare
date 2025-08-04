import { Box, Button, Container, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import DropZone from "@/components/Share/DropZone/DropZone";
import LinkInput from "@/components/LinkInput";
import { useResources } from "@/hooks/useResources";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router";
import { Paths } from "@/constants/Paths";

/**
 * Composante pour l'affichage de la page de partage de ressources 
 */
const Share = () => {
    const { files, link, isFilesDownload, setIsFilesDownload, generate, validate } = useResources();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const isValid: boolean = useMemo(() => validate(), [isFilesDownload, files, link]);

    /**
     * Génère un lien de partage de ressources
     */
    const handleGenerate = async (): Promise<void> => {
        setLoading(true);

        try {
            await generate();
            navigate(Paths.link);
        } catch (exception) {
            console.error(exception);
        } finally {
            setLoading(false);
        }
    }

    return (
        <Container maxWidth="md" sx={{ marginTop: "5rem" }}>
            <Typography variant="h4" marginBottom={5} textAlign={"center"}>Commencez votre partage</Typography>
            <Typography variant="body1" marginBottom={2} textAlign={"center"}>
                Envoyez des fichiers, raccourcissez des liens et gardez le contrôle total grâce à un tableau de bord intelligent qui suit toutes vos ressources partagées.
            </Typography>
            <Box minHeight={"20rem"} display={"flex"} flexDirection={"column"} gap={5}>
                <ToggleButtonGroup
                    color="primary"
                    value={isFilesDownload}
                    exclusive
                    onChange={(_, value) => value !== null && setIsFilesDownload(value)}
                    fullWidth
                    sx={{ display: "flex", justifyContent: "center" }}
                >
                    <ToggleButton value={true}>Fichiers</ToggleButton>
                    <ToggleButton value={false}>Lien</ToggleButton>
                </ToggleButtonGroup>

                {isFilesDownload && <DropZone />}
                {!isFilesDownload && <LinkInput />}

                <Button loading={loading} disabled={!isValid} sx={{ marginTop: "auto", alignSelf: "center", width: "15rem" }} variant="contained" onClick={handleGenerate}>Générer le lien</Button>
            </Box>
        </Container>
    );
};

export default Share;

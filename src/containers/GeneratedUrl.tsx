import { Box, Button, Container, Divider, Typography } from "@mui/material";
import { Navigate, useNavigate } from "react-router";
import { Paths } from "@/constants/Paths";
import { useResources } from "@/hooks/useResources";
import { useMemo, useState } from "react";
import LinkCopyToClipboard from "@/components/LinkCopyToClipboard";
import { useUser } from "@/hooks/useUser";

/**
 * Composante pour l'affichage du lien de partage de ressources 
 */
const GeneratedUrl = () => {
    const { user, login } = useUser();
    const { generate, currentToken } = useResources();
    const navigate = useNavigate();

    const [loggingIn, setLoggingIn] = useState(false);
    const [loading, setLoading] = useState(false);

    const link = useMemo(() => `${window.location.origin}${Paths.access}/${currentToken}`, [currentToken]);

    if (!currentToken || currentToken === "") {
        return <Navigate to={Paths.share} replace />
    }

    /**
     * Génère un lien de partage de ressources
     */
    const handleRegenerate = async () => {
        setLoading(true);

        try {
            await generate();
        } catch (exception) {
            console.error(exception);
        } finally {
            setLoading(false);
        }
    }

    /**
     * Se connecte au compte temporaire généré et ouvre le tableau de bord 
     */
    const handleOpenDashboard = async () => {
        if (user) {
            navigate(Paths.dashboard);
            return;
        }

        setLoggingIn(true);
        try {
            const formData = new FormData();
            formData.append('email', `${currentToken}@guest.com`);
            formData.append('password', currentToken);
            await login(formData);

            navigate(Paths.dashboard);
        } catch (exception) {
            console.error(exception);
        } finally {
            setLoggingIn(false);
        }
    };

    return (
        <Container maxWidth="sm" sx={{ marginTop: "10rem" }}>
            <Typography variant="h4" marginBottom={3} textAlign={"center"}>Votre lien de partage a été généré!</Typography>

            <Box display={"flex"} flexDirection={"column"} gap={2} >

                <LinkCopyToClipboard link={link} />
                <Divider />

                {!user && (
                    <Box>
                        <Typography variant="body1" textAlign={"center"}>Son code est le suivant: <strong>{currentToken}</strong></Typography>
                        <Typography variant="body1" textAlign={"center"}>Utilisez le pour monitorer son utilisation dans le tableau de bord</Typography>
                    </Box>
                )}
                <Button variant="outlined" onClick={handleOpenDashboard} loading={loggingIn}>Voir le tableau de bord</Button>

                <Button loading={loading} variant="contained" onClick={handleRegenerate}>Générer à nouveau</Button>
                <Button variant="outlined" onClick={() => navigate(Paths.share)}>Retourner</Button>
            </Box>

        </Container >
    );
};

export default GeneratedUrl;

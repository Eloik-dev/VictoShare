import { Box, Button, Container, ToggleButton, ToggleButtonGroup } from "@mui/material";
import DropZone from "../components/DropZone/DropZone";
import { ResourceProvider } from "../contexts/resourceContext";
import LinkInput from "../components/LinkInput/LinkInput";
import { useResources } from "../hooks/useResources";

const Share = () => {
    const { setIsFilesDownload, isFilesDownload } = useResources();

    return (
        <ResourceProvider>
            <Container maxWidth="md" sx={{ marginTop: "10rem" }}>
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

                    <Button sx={{ marginTop: "auto", alignSelf: "center", width: "15rem" }} variant="contained">Générer le lien</Button>
                </Box>
            </Container>
        </ResourceProvider >
    );
};

export default Share;

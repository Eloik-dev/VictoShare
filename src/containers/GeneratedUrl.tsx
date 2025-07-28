import { Container } from "@mui/material";
import { ResourceProvider } from "../contexts/resourceContext";
import FileList from "../components/FileList/FileList";

const GeneratedUrlPage = () => {
    return (
        <ResourceProvider>
            <Container>
                <h1>La clé de partage</h1>
                <FileList />
            </Container>
        </ResourceProvider >
    );
};

export default GeneratedUrlPage;
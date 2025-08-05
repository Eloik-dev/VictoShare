import { Box, Container } from "@mui/material";
import { useParams } from "react-router";
import ResourceStatus from "@/components/ResourceStatus";

/**
 * Composante pour l'accès aux ressources partagées 
 */
const Access = () => {
    const { token } = useParams();

    return (
        <Container maxWidth="sm" sx={{ marginTop: "5rem" }}>
            <Box display={"flex"} flexDirection={"column"} alignItems={"center"} gap={5}>
                <ResourceStatus token={token || ''} />
            </Box>
        </Container>
    );
};

export default Access;


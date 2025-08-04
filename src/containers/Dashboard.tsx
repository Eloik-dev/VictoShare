import { Box } from "@mui/material";
import ResourceTable from "@/components/Dashboard/ResourceTable";
import VisitorWarning from "@/components/Dashboard/VisitorWarning";

/**
 * Composante pour afficher le tableau des ressources partagées d'un utilisateur 
 */
const Dashboard = () => {
    return (
        <Box display={"flex"} maxHeight={"calc(100vh - 10rem)"} flexDirection={"column"} gap={2} marginX={5}>
            <VisitorWarning />
            <ResourceTable />
        </Box>
    );
};

export default Dashboard;
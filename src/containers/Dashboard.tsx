import { Box, Typography } from "@mui/material";
import ResourceTable from "../components/ResourceTable/ResourceTable";
import { useUser } from "../hooks/useUser";
import DateTimeUtils from "../utils/DateTimeUtils";

const Dashboard = () => {
    const { user } = useUser();

    return (
        <Box display={"flex"} flex={1} maxHeight={"calc(100vh - 10rem)"} flexDirection={"column"} gap={5} marginX={5}>
            {user && user.is_guest && user.guest_expires_at && (
                <Typography variant="h6">
                    Attention, vous êtes actuellement connecté en tant que visiteur. Votre compte sera supprimé dans&nbsp;
                    <b>{DateTimeUtils.getTimeUntilString(new Date(user.guest_expires_at))}.</b>
                </Typography>
            )}
            <ResourceTable />
        </Box>
    );
};

export default Dashboard;
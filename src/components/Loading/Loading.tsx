import { Box, Typography } from "@mui/material";
import styles from "./Loading.module.scss";

const Loading = () => {
    return (
        <Box display={"flex"} flexDirection={"column"} alignItems={"center"} justifyContent={"center"} gap={3} height={"100vh"}>
            <img id={styles['icon']} src="/icon.svg" alt="Chargement" />
            <Typography variant="h6">Récupération des informations...</Typography>
        </Box>
    );
}

export default Loading;
import { AppBar, Toolbar, Typography, Link, Button, IconButton, Box } from '@mui/material';
import type { FC } from 'react';
import { Paths } from '@/constants/Paths';
import { useUser } from '@/hooks/useUser';
import { Logout } from '@mui/icons-material';
import { useNavigate } from 'react-router';

/**
 * Composante pour la barre de navigation 
 */
const Navigation: FC = () => {
    const navigate = useNavigate();
    const { user, logout } = useUser();

    /**
     * Déconnecte l'usagé
     */
    const handleLogout = async () => {
        await logout();
        navigate(Paths.share)
    };

    return (
        <AppBar position="static" color="default" sx={{ mb: 5, height: '64px', flexShrink: 0 }}>
            <Toolbar>
                <Box display={"flex"} alignItems={"center"} gap={6}>
                    <Link href={Paths.share} color="inherit" underline="none">
                        <Typography variant="h6" component="div">
                            VictoShare
                        </Typography>
                    </Link>
                    <Button variant="outlined" href={Paths.share}>
                        Partager
                    </Button>
                </Box>

                <Box display={"flex"} gap={4} alignItems={"center"} marginLeft={"auto"}>
                    {user && (
                        <Typography variant="h6" component="div">
                            Bonjour, {user.username}!
                        </Typography>
                    )}

                    {user ? (
                        <Button variant="contained" href={Paths.dashboard}>Tableau de bord</Button>
                    ) : (
                        <Button variant="contained" href={Paths.login}>Connexion</Button>
                    )}

                    {user && (
                        <IconButton title='Se déconnecter' onClick={handleLogout}>
                            <Logout />
                        </IconButton>
                    )}
                </Box>
            </Toolbar>
        </AppBar>
    );
}

export default Navigation;


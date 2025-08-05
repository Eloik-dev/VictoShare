import { AppBar, Toolbar, Typography, Button, IconButton, Box } from '@mui/material';
import type { FC } from 'react';
import { useLocation } from 'react-router-dom';
import { Paths } from '@/constants/Paths';
import { useUser } from '@/hooks/useUser';
import { Logout } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router';

/**
 * Composante pour la barre de navigation 
 */
const Navigation: FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
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
                <Link to={Paths.share} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <Box display={"flex"} alignItems={"center"} gap={0.5}>
                        <img src="/icon.svg" alt="VictoShare Logo" style={{ height: '35px' }} />
                        <Typography variant="h6" component="div" sx={{ color: 'primary.main' }}>
                            VictoShare
                        </Typography>
                    </Box>
                </Link>

                <Box display={"flex"} gap={4} alignItems={"center"} marginLeft={"auto"}>

                    {user && (
                        <Typography variant="h6" component="div">
                            Bonjour, <b>{user.username}</b>
                        </Typography>
                    )}

                    <Button variant={location.pathname === Paths.share ? "contained" : "outlined"} href={Paths.share}>
                        Partager
                    </Button>

                    {user ? (
                        <Button variant={location.pathname === Paths.dashboard ? "contained" : "outlined"} href={Paths.dashboard}>Tableau de bord</Button>
                    ) : (
                        <Button variant={location.pathname === Paths.login ? "contained" : "outlined"} href={Paths.login}>Connexion</Button>
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


import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import type { FC } from 'react';
import { useNavigate } from 'react-router';
import { Paths } from '../../types/Paths';

const Navigation: FC = () => {
    const navigate = useNavigate();

    return (
        <AppBar position="static" color="default" sx={{ mb: 5 }}>
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Outils de partage
                </Typography>
                <Button color="inherit" onClick={() => navigate(Paths.analytics)}>
                    Tableau de bord
                </Button>
            </Toolbar>
        </AppBar>
    );
}

export default Navigation;


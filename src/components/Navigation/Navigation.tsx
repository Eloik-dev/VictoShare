import { AppBar, Toolbar, Typography, Link, Button } from '@mui/material';
import type { FC } from 'react';
import { Paths } from '../../constants/Paths';

const Navigation: FC = () => {
    return (
        <AppBar position="static" color="default" sx={{ mb: 5 }}>
            <Toolbar>
                <Link href={Paths.share} color="inherit" underline="none" sx={{ flexGrow: 1 }}>
                    <Typography variant="h6" component="div">
                        VictoShare
                    </Typography>
                </Link>

                <Button variant="outlined" color="inherit" href={Paths.dashboard}>Tableau de bord</Button>
            </Toolbar>
        </AppBar >
    );
}

export default Navigation;


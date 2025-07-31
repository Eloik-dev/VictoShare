import { Box, Button, Container, Divider, Link, TextField, Typography } from '@mui/material';
import { useState, type FC } from 'react';
import { Paths } from '@/constants/Paths';
import { useUser } from '@/hooks/useUser';

/**
 * Composante de connexion 
 */
const Login: FC = () => {
    const { login } = useUser();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [guestCode, setGuestCode] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    /**
     * Fait la connexion d'un utilisateur 
     */
    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!validate()) {
            return;
        }

        setLoading(true);
        await login(new FormData(e.currentTarget));
        setLoading(false);
    }

    /**
     * Valide les champs de connexion 
     */
    const validate = () => {
        if (guestCode.length > 0) {
            return true;
        }

        if (!email || !password) {
            setError('Tous les champs sont obligatoires');
            return false;
        }

        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        if (!emailRegex.test(email)) {
            setError('Le courriel n\'est pas valide');
            return false;
        }

        if (password.length < 8) {
            setError('Le mot de passe doit contenir au moins 8 caractères');
            return false;
        }

        setError('');
        return true;
    }

    return (
        <Container maxWidth="sm" sx={{ marginTop: "10rem" }}>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    padding: '30px',
                    borderRadius: '10px',
                    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)'
                }}
            >
                <Typography variant="h4" gutterBottom>
                    Connexion à votre compte
                </Typography>
                <form onSubmit={handleLogin}>
                    <TextField
                        label="Courriel"
                        name='email'
                        variant="outlined"
                        sx={{ mb: 2 }}
                        fullWidth
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={guestCode.length > 0}
                        />
                    <TextField
                        label="Mot de passe"
                        variant="outlined"
                        name='password'
                        type="password"
                        sx={{ mb: 2 }}
                        fullWidth
                        onChange={(e) => setPassword(e.target.value)}
                        disabled={guestCode.length > 0}
                    />
                    <Divider sx={{ mb: 2 }}>
                        <Typography variant="body2" color="text.secondary" sx={{ px: 2 }}>
                            OU
                        </Typography>
                    </Divider>
                    <TextField
                        label="Code invité"
                        variant="outlined"
                        name='guestCode'
                        sx={{ mb: 2 }}
                        fullWidth
                        onChange={(e) => setGuestCode(e.target.value)}
                    />

                    <Button variant="contained" type="submit" fullWidth loading={loading}>
                        Connexion
                    </Button>
                </form>
                {error && <Typography variant="body2" color="error" sx={{ mt: 2 }}>{error}</Typography>}
                <Typography variant="body2" sx={{ mt: 2 }}>
                    Pas de compte ? <Link href={Paths.register}>Inscrivez-vous</Link>
                </Typography>
            </Box>

        </Container>
    );
}

export default Login;


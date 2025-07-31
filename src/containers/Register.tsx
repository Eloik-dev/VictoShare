import { Box, Button, Container, Link, TextField, Typography } from '@mui/material';
import type { FC } from 'react';
import { useState } from 'react';
import { Paths } from '@/constants/Paths';
import useRequest from '@/hooks/useRequest';
import { ApiPaths } from '@/constants/ApiPaths';
import { useNavigate } from 'react-router';

/**
 * Composante pour la page de création de compte 
 */
const Register: FC = () => {
    const { post } = useRequest();
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    /**
     * Fait l'inscription d'un utilisateur
     */
    const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!validate()) {
            return;
        }

        setLoading(true);
        try {
            const response = await post(ApiPaths.auth.register, new FormData(e.currentTarget));

            if (response?.errors) {
                const values = Object.values(response.errors);
                setError(values.join('\n'));
            } else {
                navigate(Paths.login);
            }
        } catch (error) {
            setError('Erreur inconnue');
        } finally {
            setLoading(false);
        }
    }

    /**
     * Valide les champs de connexion 
     */
    const validate = () => {
        if (!username || !email || !password) {
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
                    Créez un compte
                </Typography>
                <form onSubmit={handleRegister}>
                    <TextField
                        label="Nom d'utilisateur"
                        variant="outlined"
                        name='username'
                        sx={{ mb: 2 }}
                        fullWidth
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <TextField
                        label="Courriel"
                        variant="outlined"
                        name='email'
                        sx={{ mb: 2 }}
                        fullWidth
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                        label="Mot de passe"
                        variant="outlined"
                        name='password'
                        type="password"
                        sx={{ mb: 2 }}
                        fullWidth
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button variant="contained" type="submit" fullWidth loading={loading}>
                        Inscription
                    </Button>
                </form>
                {error && <Typography variant="body2" color="error" sx={{ mt: 2 }}>{error}</Typography>}
                <Typography variant="body2" sx={{ mt: 2 }}>
                    Déjà inscrit ? <Link href={Paths.login}>Connectez-vous</Link>
                </Typography>
            </Box>
        </Container>
    );
}
export default Register;



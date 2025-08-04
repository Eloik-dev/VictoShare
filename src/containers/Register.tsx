import { Box, Button, Container, Link, TextField, Typography } from '@mui/material';
import type { FC } from 'react';
import { useState } from 'react';
import { Paths } from '@/constants/Paths';
import useRequest from '@/hooks/useRequest';
import { ApiPaths } from '@/constants/ApiPaths';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import AuthUtils from '@/utils/AuthUtils';

/**
 * Composante pour la page de création de compte 
 */
const Register: FC = () => {
    const { post } = useRequest();
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [usernameError, setUsernameError] = useState('');

    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');

    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');

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
                toast.error(values.join('\n'));
            } else {
                navigate(Paths.login);
                toast.success('Votre compte a été créé avec succès. Vous pouvez maintenant vous connecter.');
            }
        } catch (error) {
            toast.error('Une erreur inconnue est survenue. Veuillez réessayer plus tard.');
        } finally {
            setLoading(false);
        }
    }

    /**
     * Valide les champs de connexion 
     */
    const validate = () => {
        let valid = true;

        setUsernameError('');
        setEmailError('');
        setPasswordError('');

        if (!username) {
            setUsernameError('Le nom d\'utilisateur est requis.');
            valid = false;
        }

        if (!email) {
            setEmailError('Le courriel est requis.');
            valid = false;
        } else if (!AuthUtils.isEmailValid(email)) {
            setEmailError('Le courriel n\'est pas valide.');
            valid = false;
        }

        if (!password) {
            setPasswordError('Le mot de passe est requis.');
            valid = false;
        } else if (password.length < 8) {
            setPasswordError('Le mot de passe doit contenir au moins 8 caractères.');
            valid = false;
        }

        return valid;
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
                <Typography variant="h4" gutterBottom paddingBottom={2}>
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
                        error={usernameError !== ''}
                        helperText={usernameError}
                    />
                    <TextField
                        label="Courriel"
                        variant="outlined"
                        name='email'
                        sx={{ mb: 2 }}
                        fullWidth
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        error={emailError !== ''}
                        helperText={emailError}
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
                        error={passwordError !== ''}
                        helperText={passwordError}
                    />
                    <Button variant="contained" type="submit" fullWidth loading={loading}>
                        Inscription
                    </Button>
                </form>
                <Typography variant="body2" sx={{ mt: 2 }}>
                    Déjà inscrit ? <Link href={Paths.login} underline='none'>Connectez-vous</Link>
                </Typography>
            </Box>
        </Container>
    );
}
export default Register;




import { Box, Button, Container, Divider, Link, TextField, Typography } from '@mui/material';
import { useState, type FC } from 'react';
import { Paths } from '@/constants/Paths';
import { useUser } from '@/hooks/useUser';
import { toast } from 'react-toastify';
import AuthUtils from '@/utils/AuthUtils';

/**
 * Composante de connexion 
 */
const Login: FC = () => {
    const { login } = useUser();

    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');

    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const [guestCode, setGuestCode] = useState('');
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
        let valid = true;

        setEmailError('');
        setPasswordError('');

        if (guestCode.length > 0) {
            return true;
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
                <Typography variant="body2" sx={{ mt: 2 }}>
                    Pas de compte ? <Link href={Paths.register} underline='none'>Inscrivez-vous</Link>
                </Typography>
            </Box>

        </Container>
    );
}

export default Login;


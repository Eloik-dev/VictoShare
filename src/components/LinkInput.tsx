import { TextField } from "@mui/material";
import { useResources } from "@/hooks/useResources";
import type { FC } from 'react';
import { useState } from 'react';

/**
 * Composante de saisie d'un lien à partager 
 */
const LinkInput: FC = () => {
    const { link, setLink } = useResources();
    const [error, setError] = useState<string | null>(null);

    /**
     * Gestion de la saisie de l'url
     * @param event L'événement de saisie
     */
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setLink(value);
    }

    /**
     * Vérifie l'URL lors de la perte de focus
     * @param event L'événement de perte de focus
     */
    const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
        try {
            new URL(event.target.value);
            setError(null);
        } catch (_) {
            setError('Veuillez entrer une URL valide.');
        }
    }

    return (
        <TextField
            value={link || ''}
            onChange={handleChange}
            onBlur={handleBlur}
            label="Entrez votre lien ici..."
            variant="outlined"
            error={error !== null}
            helperText={error}
        />
    )
}

export default LinkInput;


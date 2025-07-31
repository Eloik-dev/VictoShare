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

        try {
            setLink(value);
            
            new URL(value);
            setError(null);
        } catch (_) {
            setError('Veuillez entrer une URL valide.');
        }
    }

    return (
        <TextField
            value={link || ''}
            onChange={handleChange}
            label="Entrez votre lien ici..."
            variant="filled"
            error={error !== null}
            helperText={error}
        />
    )
}

export default LinkInput;


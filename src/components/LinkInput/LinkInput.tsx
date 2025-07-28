import { TextField } from "@mui/material";
import { useResources } from "../../hooks/useResources";
import type { FC } from 'react';

const LinkInput: FC = () => {
    const { link, setLink } = useResources();

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLink(event.target.value)
    }

    return (
        <TextField value={link || ''} onChange={handleChange} label="Entrez votre lien ici..." variant="filled" />
    )
}

export default LinkInput;


import { Box, IconButton, Link, TextField } from "@mui/material";
import { type FC } from 'react';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { toast } from "react-toastify";

interface ILinkCopyToClipboard {
    link: string
}

/**
 * Inspiré de @link https://codesandbox.io/p/sandbox/react-copy-to-clipboard-button-with-material-ui-c8sly3
 */
const LinkCopyToClipboard: FC<ILinkCopyToClipboard> = ({ link }) => {
    const handleClick = () => {
        navigator.clipboard.writeText(link);
        toast.success("Lien copié dans le presse-papier!");
    };

    return (
        <Box display={"flex"} gap={1}>
            <TextField
                sx={{ flexGrow: 1 }}
                value={link || ''}
                slotProps={{
                    input: {
                        readOnly: true,
                    },
                }}
            />
            <IconButton onClick={handleClick} color="primary">
                <ContentCopyIcon />
            </IconButton>
            <IconButton color="primary">
                <Link target="_blank" href={link}>
                    <OpenInNewIcon />
                </Link>
            </IconButton>
        </Box>
    );
};

export default LinkCopyToClipboard;


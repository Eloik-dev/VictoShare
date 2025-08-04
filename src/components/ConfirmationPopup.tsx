import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { type FC } from "react";

export interface IConfirmationPopup {
    open: boolean,
    title: string,
    description: string,
    onConfirm: () => void
    onClose: () => void
}

const ConfirmationPopup: FC<IConfirmationPopup> = ({ open, title, description, onConfirm, onClose }) => {
    return (
        <Dialog
            open={open}
            onClose={onClose}
        >
            <DialogTitle>
                {title}
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {description}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} variant="outlined">Annuler</Button>
                <Button onClick={onConfirm} variant="contained" autoFocus>
                    Confirmer
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default ConfirmationPopup
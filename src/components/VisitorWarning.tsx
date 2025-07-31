import { useUser } from "@/hooks/useUser";
import DateTimeUtils from "@/utils/DateTimeUtils";
import { Typography } from "@mui/material";

const VisitorWarning = () => {
    const { user } = useUser();

    if (!user || !user.is_guest || !user.guest_expires_at) return <></>;

    return (
        <Typography variant="h6">
            Attention, vous êtes actuellement connecté en tant que visiteur. Votre compte sera supprimé dans&nbsp;
            <b>{DateTimeUtils.getTimeUntilString(new Date(user.guest_expires_at))}.</b>
        </Typography>
    );
}

export default VisitorWarning;
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

/**
 * Hook pour accéder à la gestion de l'utilisateur 
 */
export const useUser = () => {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error("useUser must be used within a UserProvider");
    }
    return context;
}
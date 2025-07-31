import { useContext } from "react";
import { ResourceContext } from "../contexts/ResourceContext";

/**
 * Hook pour accéder à la gestion des ressources partagées 
 */
export const useResources = () => {
    const context = useContext(ResourceContext);
    if (context === undefined) {
        throw new Error("useResources must be used within a UserProvider");
    }
    return context;
}
import { useContext } from "react";
import { ResourceContext } from "../contexts/ResourceContext";

export const useResources = () => {
    const context = useContext(ResourceContext);
    if (context === undefined) {
        throw new Error("useResources must be used within a UserProvider");
    }
    return context;
}
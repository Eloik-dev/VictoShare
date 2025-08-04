import { createContext, useEffect, useState } from "react";
import type User from "../types/User";
import useRequest from "../hooks/useRequest";
import { ApiPaths } from "../constants/ApiPaths";
import Loading from "@/components/Loading/Loading";
import { toast } from "react-toastify";

export interface IUserContext {
    user: User | null;
    setUser: (user: User | null) => void;
    login: (data: any) => void;
    logout: () => void
}

export const UserContext = createContext<IUserContext>({
    user: null,
    setUser: () => { },
    login: () => { },
    logout: () => { }
});

/**
 * Contexte pour la gestion de l'utilisateur 
 */
export const UserProvider = ({ children }: { children: React.ReactNode }) => {
    const { get, post } = useRequest();
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        if (!user) {
            refreshUser();
        }
    }, [])

    /**
     * Rafraichissement de l'utilisateur
     */
    const refreshUser = async () => {
        setLoading(true);

        try {
            const response = await get(ApiPaths.auth.user);

            if (response?.user) {
                setUser(response.user);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    /**
     * Fait la connexion d'un utilisateur 
     */
    const login = async (data: any) => {
        const response = await post(ApiPaths.auth.login, data);
        switch (response?.status) {
            case 401:
                toast.error('Ce compte n\'existe pas ou les informations de connexion sont incorrectes.');
                break;

            case 200:
                setUser(response.user);
                toast.success(`Vous êtes maintenant connecté en tant que ${response.user.username}!`);
                break;
        }
    }

    /**
     * Fait la déconnexion d'un utilisateur
     */
    const logout = async () => {
        try {
            await get(ApiPaths.auth.logout);
            setUser(null);
        } catch (error) {
            console.error(error);
        }
    }

    if (loading) {
        return <Loading />
    };

    return (
        <UserContext.Provider value={{ user, setUser, login, logout }}>
            {children}
        </UserContext.Provider>
    );
}
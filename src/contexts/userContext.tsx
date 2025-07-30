import { createContext, useEffect, useState } from "react";
import type User from "../types/User";
import useRequest from "../hooks/useRequest";
import { ApiPaths } from "../constants/ApiPaths";

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

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
    const { get, post } = useRequest();
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    // If no user get it
    useEffect(() => {
        if (!user) {
            refreshUser();
        }
    }, [])

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

    const login = async (data: any) => {
        const response = await post(ApiPaths.auth.login, data);
        switch (response?.status) {
            case 401:
                throw new Error('Ce compte n\'existe pas ou les informations de connexion sont incorrectes');

            case 200:
                setUser(response.user);
                break;
        }
    }

    const logout = async () => {
        try {
            await get(ApiPaths.auth.logout);
            setUser(null);
        } catch (error) {
            console.error(error);
        }
    }

    if (loading) return null;

    return (
        <UserContext.Provider value={{ user, setUser, login, logout }}>
            {children}
        </UserContext.Provider>
    );
}
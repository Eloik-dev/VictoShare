import { createContext, useState } from "react";
import type User from "../types/User";

export interface IUserContext {
    user: any;
    setUser: any;
}

export const UserContext = createContext<IUserContext>({
    user: null,
    setUser: () => { },
});

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
}
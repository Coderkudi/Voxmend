import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

type User = {
    id: string;
    name: string;
    email: string;
}

type AuthcontextType = {
    user: User | null;
    token: string | null;
    login: (token: string, user: User) => void;
    logout: () => void;
};

const AuthContext = createContext<AuthcontextType | undefined>(undefined);

export const AuthProvider = ({
    children,
}: {
        children: ReactNode;
}) => {
    const [user, setUser] = useState<User | null>(() => {
        const storeduser = localStorage.getItem("user");

        return storeduser
            ? JSON.parse(storeduser)
            : null;
    });

    const [token, setToken] = useState<string | null>(
        localStorage.getItem("token")
    );

    const login = (token: string, user: User) => {
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
        setToken(token);
        setUser(user);
    };

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setToken(null);
        setUser(null);
    }

    return (
        <AuthContext.Provider
            value={{
                user,
                token,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('UseAuth must be used within AuthProvder');
    }
    return context;
};

import Cookies from "js-cookie";
import { createContext, useEffect, useState } from "react";

interface AuthContextType {
    isLoggedIn: boolean;
    user: User | null;
    handleLogin: (email: string, password: string) => void;
    handleLogout: () => void;
}

const AuthContext = createContext<AuthContextType>({
    isLoggedIn: false,
    user: null,
    handleLogin: () => { },
    handleLogout: () => { },
});

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [authState, setAuthState] = useState({
        token: Cookies.get("token") || null,
        user: Cookies.get("user") || null,
        isLoggedIn: Cookies.get("isLoggedIn") === "false" ? false : true || false,
    });

    const [user, setUser] = useState<User | null>(authState.user ? JSON.parse(authState.user) : null);
    const [isLoggedIn, setIsLoggedIn] = useState(Boolean(authState.isLoggedIn));

    const handleLogin = async (email: string, password: string) => {
        try {
            const response = await fetch('/api/user', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });
            if (response.ok) {
                const data = await response.json();
                setAuthState({
                    token: data.token,
                    user: JSON.stringify(data),
                    isLoggedIn: true,
                });
                setIsLoggedIn(true);
                setUser(data);
            } else {
                console.error('Error en la autenticación');
            }
        } catch (error) {
            console.error('Error en la autenticación:', error);
        }
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        setUser(null);
        setAuthState({
            token: null,
            user: null,
            isLoggedIn: false,
        });
        Cookies.set("redirectUrl", "")
    };

    const authContextValue = {
        isLoggedIn,
        setIsLoggedIn,
        handleLogin,
        handleLogout,
        user,
        setUser,
    };

    useEffect(() => {
        Cookies.set("token", authState.token || "");
        Cookies.set("user", authState.user || "");
        Cookies.set("isLoggedIn", authState.isLoggedIn.toString() || "false");
    }, [authState]);

    return (
        <AuthContext.Provider value={authContextValue}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };

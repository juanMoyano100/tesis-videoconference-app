import { createContext, useContext, useState } from "react";

// definimos la forma de nuestro estado
interface AuthState {
    isLoggedIn: boolean;
    user: { email: string } | null;
}

// definimos los tipos de nuestro context
interface AuthContextValue extends AuthState {
    login: (email: string, password: string) => void;
    logout: () => void;
}

// creamos el contexto
const AuthContext = createContext<AuthContextValue | null>(null);

// creamos el provider
export const AuthProvider: React.FC = ({ children }: any) => {
    const [authState, setAuthState] = useState<AuthState>({
        isLoggedIn: false,
        user: null,
    });

    const login = (email: string, password: string) => {
        // aquí iría la lógica para autenticar al usuario
        // por simplicidad, simplemente marcamos al usuario como autenticado
        setAuthState({
            isLoggedIn: true,
            user: { email },
        });
    };

    const logout = () => {
        // aquí iría la lógica para desautenticar al usuario
        // por simplicidad, simplemente marcamos al usuario como no autenticado
        setAuthState({
            isLoggedIn: false,
            user: null,
        });
    };

    return (
        <AuthContext.Provider value={{ ...authState, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// creamos el hook personalizado para usar el contexto
export const useAuth = () => {
    const authContext = useContext(AuthContext);

    // if (!authContext) {
    //     throw new Error("useAuth must be used within an AuthProvider");
    // }

    return authContext;
};

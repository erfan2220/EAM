import React, { createContext, useContext, useState } from 'react';

// Define the type for the context value
type AuthContextType = {
    login: boolean;
    setLogin: React.Dispatch<React.SetStateAction<boolean>>;
    token:string | null;
    setToken:React.Dispatch<React.SetStateAction<string | null>>;
    username:string | null;
    setUsername:React.Dispatch<React.SetStateAction<string | null>>;
    password:string | null;
    setPassword:React.Dispatch<React.SetStateAction<string | null>>;

    accessPoint:string[] | null;
    setAccessPoint:React.Dispatch<React.SetStateAction<string[] | null>>;

};

// Create the context with the defined type
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Define the AuthProvider component with children prop
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) =>
{
    const [login, setLogin] = useState(false);
const [token,setToken]=useState<string | null>(null)
    const [username,setUsername]=useState<string | null>(null)
    const [password,setPassword]=useState<string | null>(null)
const [accessPoint,setAccessPoint]=useState<string[] | null>([])

    return (
        <AuthContext.Provider value={{ login, setLogin ,token,setToken,username,setUsername ,accessPoint,setAccessPoint,password,setPassword}}>
            {children}
        </AuthContext.Provider>
    );
};

// Define the useAuth hook with the defined type
export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

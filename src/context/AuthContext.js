import { createContext, useState, useMemo } from "react";

const TokenContext = createContext();

export const TokenProvider = ({ children }) => {
    const [token, setToken] = useState("");

    const currentValueToken = useMemo(() => {
        return {
            token,
            setToken
        }
    } , [token]);

    return (
        <TokenContext.Provider value={currentValueToken}>
            {children}
        </TokenContext.Provider>
    );
};

export default TokenContext;
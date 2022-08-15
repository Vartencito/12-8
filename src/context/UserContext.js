import { createContext, useState, useMemo } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState({username: '',password: ''});

    console.log('usuario dentro del context: ',user)

    const currentValueUser = useMemo(() => {
        return {
            user,
            setUser
        }
    } , [user]);

    return (
        <UserContext.Provider value={currentValueUser}>
            {children}
        </UserContext.Provider>
    );
};

export default UserContext;
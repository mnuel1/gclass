import { useState } from 'react'

export const Authentication = () => {
    
    const [user, setUser] = useState<string | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [id, setID] = useState<number | null>(null);

    const getToken = () => {
        const tokenString = sessionStorage.getItem('token');
        const token = tokenString ? JSON.parse(tokenString) : null;
        return token;
    } 

    const getUser = () => {
        const userString = sessionStorage.getItem('user');
        const user = userString ? JSON.parse(userString) : null;
        return user;
    }

    const getID = () => {
        const idString = sessionStorage.getItem('id');
        const id = idString ? JSON.parse(idString) : null;
        return id;
    }

    const login = (user: string, token: string, id: number) => {
        sessionStorage.setItem('token', JSON.stringify(token));
        sessionStorage.setItem('user', JSON.stringify(user));
        sessionStorage.setItem('id', JSON.stringify(id));
        setUser(user);
        setToken(token);
        setID(id)
    }

    const logout = () => {
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('user');
        sessionStorage.removeItem('id');
        setUser(null);
        setToken(null);
        setID(null)
    }

    const isAuthenticated = () => {
        const user = getUser();
        const token = getToken();
        const id = getID()

        return token !== null && user !== null && id !== null;
    }


    return {
        id,
        user,
        token,
        login,
        logout,
        isAuthenticated,
        getUser,
        getToken,
        getID
    }
}

import { useState } from 'react'

export const Authentication = () => {
    
    const [user, setUser] = useState<string | null>(null);
    const [email, setEmail] = useState<string | null>(null);
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

    const getEmail = () => {
        const emailString = sessionStorage.getItem('email');
        const email = emailString ? JSON.parse(emailString) : null;
        return email;
    }

    const getID = () => {
        const idString = sessionStorage.getItem('id');
        const id = idString ? JSON.parse(idString) : null;
        return id;
    }

    const login = (user: string, token: string, id: number, email: string) => {
        sessionStorage.setItem('token', JSON.stringify(token));
        sessionStorage.setItem('user', JSON.stringify(user));
        sessionStorage.setItem('id', JSON.stringify(id));
        sessionStorage.setItem('email', JSON.stringify(email));
        setUser(user);
        setToken(token);
        setEmail(email)
        setID(id)
    }

    const logout = () => {
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('user');
        sessionStorage.removeItem('id');
        sessionStorage.removeItem('email');
        localStorage.removeItem("meetingName");
        localStorage.removeItem("selectedClassroom");
        setUser(null);
        setToken(null);
        setEmail(null)
        setID(null)
    }

    const isAuthenticated = () => {
        const user = getUser();
        const token = getToken();
        const id = getID()
        const email = getEmail()

        return token !== null && user !== null && id !== null && email !== null;
    }


    return {
        id,
        user,
        token,
        email,
        login,
        logout,
        isAuthenticated,
        getUser,
        getToken,
        getID,
        getEmail
    }
}

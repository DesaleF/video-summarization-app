import React, { useState, useEffect } from 'react';
import UserContext from './userContext';

export default function AuthProvider({ children }) {
    const [user, setUser] = useState(null);

    // Check local storage for user data on initial render
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const signup = (username, password, email) => {
        // For simplicity, we'll just store the user data in local storage.
        // In a real app, you'd send a request to a server to register the user.
        const newUser = { username, password, email };
        localStorage.setItem('user', JSON.stringify(newUser));
        setUser(newUser);
    };

    const login = (username, password) => {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (storedUser && storedUser.username === username && storedUser.password === password) {
            setUser(storedUser);
        } else {
            alert('Invalid credentials');
        }
    };

    const logout = () => {
        localStorage.removeItem('user');
        setUser(null);
    };

    return (
        <UserContext.Provider value={{ user, signup, login, logout }}>
            {children}
        </UserContext.Provider>
    );
}
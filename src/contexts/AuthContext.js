import React, {createContext, useContext, useEffect, useState} from "react";

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

const initDefaultUsers = () => {
    const existing = localStorage.getItem("users");
    if (!existing) {
        const users = [
            {id: 1, username: "admin", password: "admin123", role: "admin"},
            {id: 2, username: "user1", password: "user123", role: "user"},
        ];
        localStorage.setItem("users", JSON.stringify(users));
    }

};

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        initDefaultUsers();

        const savedUser = localStorage.getItem("currentUser");
        if (savedUser) {
            setUser(JSON.parse(savedUser));
        }
        setLoading(false);
    }, []);

    const login = (username, password) => {
        const users = JSON.parse(localStorage.getItem("users")) || [];
        const found = users.find(
            (u) => u.username === username && u.password === password
        );

        if (!found) {
            return {success: false, message: "Invalid username or password"};
        }

        const safeUser = {
            id: found.id,
            username: found.username,
            role: found.role,
        };

        setUser(safeUser);
        localStorage.setItem("currentUser", JSON.stringify(safeUser));
        return {success: true, role: found.role};
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("currentUser");
    };

    const value ={
        user,
        loading,
        login,
        logout,
        isAdmin: user?.role === "admin",
        isUser: user?.role === "user",
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
};
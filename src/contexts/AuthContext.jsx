import React, { createContext, useState, useEffect } from 'react';
import authService from '../services/authService';
import { getCurrentUser } from '../utils/helpers';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAuth = () => {
            if (authService.isAuthenticated()) {
                const user = getCurrentUser();
                setCurrentUser(user);
                setIsAuthenticated(true);
            } else {
                setCurrentUser(null);
                setIsAuthenticated(false);
            }
            setLoading(false);
        };

        checkAuth();
    }, []);

    const login = async (credentials) => {
        const response = await authService.login(credentials);
        if (response.token) {
            localStorage.setItem('authToken', response.token);
            setCurrentUser(getCurrentUser());
            setIsAuthenticated(true);
        }
        return response;
    };

    const loginWithCaptcha = async (credentials, captchaToken) => {
        const response = await authService.loginWithCaptcha(credentials, captchaToken);
        if (response.token) {
            localStorage.setItem('authToken', response.token);
            setCurrentUser(getCurrentUser());
            setIsAuthenticated(true);
        }
        return response;
    };

    const verifyTwoFactor = async (email, token) => {
        const response = await authService.verifyTwoFactor(email, token);
        if (response.token) {
            localStorage.setItem('authToken', response.token);
            setCurrentUser(getCurrentUser());
            setIsAuthenticated(true);
        }
        return response;
    };

    const register = async (userData) => {
        return await authService.register(userData);
    };

    const logout = () => {
        authService.logout();
        setCurrentUser(null);
        setIsAuthenticated(false);
    };

    const value = {
        currentUser,
        isAuthenticated,
        loading,
        login,
        loginWithCaptcha,
        verifyTwoFactor,
        register,
        logout
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};
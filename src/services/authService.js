import api from './api';
import appConfig from '../config/appConfig';

export const authService = {
    async login(credentials) {
        try {
            const response = await api.post(appConfig.api.endpoints.login, credentials);
            return response.data;
        } catch (error) {
            throw error.response?.data || { error: 'Login failed' };
        }
    },

    async loginWithCaptcha(credentials, captchaToken) {
        try {
            const response = await api.post(appConfig.api.endpoints.loginCaptcha, {
                ...credentials,
                captchaToken
            });
            return response.data;
        } catch (error) {
            throw error.response?.data || { error: 'Login failed' };
        }
    },

    async verifyTwoFactor(email, token) {
        try {
            const response = await api.post(appConfig.api.endpoints.loginTwoFactor, {
                email,
                token
            });
            return response.data;
        } catch (error) {
            throw error.response?.data || { error: 'Two-factor verification failed' };
        }
    },

    async generateTwoFactorToken(email) {
        try {
            await api.post(`${appConfig.api.endpoints.generateTwoFactor}?email=${encodeURIComponent(email)}`);
        } catch (error) {
            console.error('Failed to generate 2FA token:', error);
        }
    },

    async register(userData) {
        try {
            const response = await api.post(appConfig.api.endpoints.register, userData);
            return response.data;
        } catch (error) {
            throw error.response?.data || { error: 'Registration failed' };
        }
    },

    logout() {
        localStorage.removeItem('authToken');
    },

    isAuthenticated() {
        return localStorage.getItem('authToken') !== null;
    },
};

export default authService;
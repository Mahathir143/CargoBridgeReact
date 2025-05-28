import { format } from 'date-fns';
import { jwtDecode } from 'jwt-decode';

export const formatDateTime = (date) => {
    return format(new Date(date), 'yyyy-MM-dd HH:mm:ss');
};

export const formatLockoutTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
};

export const getTokenData = (token) => {
    try {
        if (!token) return null;
        return jwtDecode(token);
    } catch (error) {
        console.error('Invalid token:', error);
        return null;
    }
};

export const getCurrentUser = () => {
    const token = localStorage.getItem('authToken');
    if (!token) return null;

    try {
        const decoded = jwtDecode(token);
        return {
            username: decoded.username || decoded.sub,
            userId: decoded.userId || decoded.nameid,
            email: decoded.email,
            roles: decoded.role || []
        };
    } catch (error) {
        console.error('Error decoding token:', error);
        return null;
    }
};
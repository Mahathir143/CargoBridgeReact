import appConfig from '../config/appConfig';

export const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

export const validatePassword = (password) => {
    const { minLength, requireUppercase, requireLowercase, requireNumbers, requireSymbols } = appConfig.auth.passwordRules;

    const errors = [];

    if (password.length < minLength) {
        errors.push(`Password must be at least ${minLength} characters long`);
    }

    if (requireUppercase && !/[A-Z]/.test(password)) {
        errors.push('Password must contain at least one uppercase letter');
    }

    if (requireLowercase && !/[a-z]/.test(password)) {
        errors.push('Password must contain at least one lowercase letter');
    }

    if (requireNumbers && !/\d/.test(password)) {
        errors.push('Password must contain at least one number');
    }

    if (requireSymbols && !/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password)) {
        errors.push('Password must contain at least one special character');
    }

    return {
        isValid: errors.length === 0,
        errors
    };
};

export const validateUsername = (username) => {
    if (!username || username.trim().length < 3) {
        return {
            isValid: false,
            error: 'Username must be at least 3 characters long'
        };
    }

    return {
        isValid: true
    };
};

export const validatePasswordConfirmation = (password, confirmation) => {
    return password === confirmation;
};
const appConfig = {
    api: {
        baseUrl: import.meta.env.VITE_API_BASE_URL || 'https://localhost:7021',
        endpoints: {
            login: '/api/account/login',
            loginCaptcha: '/api/account/login/captcha',
            loginTwoFactor: '/api/account/login/twofactor',
            generateTwoFactor: '/api/account/generate-2fa-token',
            register: '/api/account/register',

            // New menu endpoints
            getMenus: '/api/Menu/GetMenus', // Make sure this matches your backend endpoint
        }
    },
    auth: {
        lockoutConfig: {
            maxFailedAttempts: 3,
            captchaThreshold: 2,
            lockoutDuration: 5, // minutes
        },
        passwordRules: {
            minLength: 8,
            requireUppercase: true,
            requireLowercase: true,
            requireNumbers: true,
            requireSymbols: true
        }
    },
    recaptcha: {
        siteKey: import.meta.env.VITE_RECAPTCHA_SITE_KEY
    },
    ui: {
        colors: {
            primary: import.meta.env.VITE_PRIMARY_COLOR || '#4e704b',
            secondary: import.meta.env.VITE_SECONDARY_COLOR || '#6c757d',
            text: import.meta.env.VITE_TEXT_COLOR || '#212529'
        },
        logoUrl: import.meta.env.VITE_LOGO_URL || '/src/assets/logo.png'
    }
};

export default appConfig;
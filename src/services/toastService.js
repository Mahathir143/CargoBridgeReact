import toast from 'react-hot-toast';

export const showToast = {
    success: (message, options = {}) => {
        toast.success(message, {
            duration: 4000,
            position: 'top-right',
            style: {
                background: '#d1edff',
                color: '#0c63e4',
                border: '1px solid #bee5eb',
            },
            iconTheme: {
                primary: '#0c63e4',
                secondary: '#fff',
            },
            ...options
        });
    },

    error: (message, options = {}) => {
        toast.error(message, {
            duration: 5000,
            position: 'top-right',
            style: {
                background: '#f8d7da',
                color: '#721c24',
                border: '1px solid #f5c6cb',
            },
            iconTheme: {
                primary: '#dc3545',
                secondary: '#fff',
            },
            ...options
        });
    },

    warning: (message, options = {}) => {
        toast(message, {
            duration: 4000,
            position: 'top-right',
            icon: '⚠️',
            style: {
                background: '#fff3cd',
                color: '#856404',
                border: '1px solid #ffeaa7',
            },
            ...options
        });
    },

    info: (message, options = {}) => {
        toast(message, {
            duration: 4000,
            position: 'top-right',
            icon: 'ℹ️',
            style: {
                background: '#d1ecf1',
                color: '#0c5460',
                border: '1px solid #bee5eb',
            },
            ...options
        });
    }
};
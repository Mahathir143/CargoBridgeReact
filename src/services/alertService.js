import Swal from 'sweetalert2';

export const showAlert = {
    confirm: async (title, text = '', confirmButtonText = 'Yes, proceed!') => {
        const result = await Swal.fire({
            title: title,
            text: text,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#0d6efd',
            cancelButtonColor: '#6c757d',
            confirmButtonText: confirmButtonText,
            cancelButtonText: 'Cancel',
            reverseButtons: true
        });
        return result.isConfirmed;
    },

    delete: async (itemName = 'this item') => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: `You won't be able to revert this! This will permanently delete ${itemName}.`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#dc3545',
            cancelButtonColor: '#6c757d',
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'Cancel'
        });
        return result.isConfirmed;
    },

    success: (title, text = '') => {
        return Swal.fire({
            title: title,
            text: text,
            icon: 'success',
            confirmButtonColor: '#198754'
        });
    },

    error: (title, text = '') => {
        return Swal.fire({
            title: title,
            text: text,
            icon: 'error',
            confirmButtonColor: '#dc3545'
        });
    },

    info: (title, text = '') => {
        return Swal.fire({
            title: title,
            text: text,
            icon: 'info',
            confirmButtonColor: '#0dcaf0'
        });
    }
};
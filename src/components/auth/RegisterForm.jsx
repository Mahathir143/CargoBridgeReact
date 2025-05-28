import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import {
    validatePassword,
    validateUsername,
    validateEmail,
    validatePasswordConfirmation
} from '../../utils/validators';
import appConfig from '../../config/appConfig';

const RegisterForm = () => {
    const navigate = useNavigate();
    const { register } = useAuth();

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        isTwoFactorEnabled: false
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
        if (errors[name]) setErrors((prev) => ({ ...prev, [name]: null }));
    };

    const validateForm = () => {
        const newErrors = {};
        const usernameValidation = validateUsername(formData.username);
        if (!usernameValidation.isValid) newErrors.username = usernameValidation.error;
        if (!validateEmail(formData.email)) newErrors.email = 'Invalid email address';
        const pwdValidation = validatePassword(formData.password);
        if (!pwdValidation.isValid) newErrors.password = pwdValidation.errors.join('. ');
        if (!validatePasswordConfirmation(formData.password, formData.confirmPassword)) {
            newErrors.confirmPassword = 'Passwords do not match';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;
        setLoading(true);
        try {
            await register(formData);
            setSuccess(true);
            setTimeout(() => navigate('/'), 3000);
        } catch (err) {
            if (Array.isArray(err)) {
                const errMap = {};
                err.forEach(e => {
                    errMap[e.field || 'general'] = e.description || e.message;
                });
                setErrors(errMap);
            } else {
                setErrors({ general: err.error || 'Registration failed.' });
            }
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div className="alert alert-success">
                <h4 className="alert-heading">Registration Successful!</h4>
                <p>Redirecting to login...</p>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} noValidate>
            {errors.general && <div className="alert alert-danger">{errors.general}</div>}

            <div className="mb-3">
                <label className="form-label">Username</label>
                <input
                    type="text"
                    name="username"
                    className={`form-control ${errors.username ? 'is-invalid' : ''}`}
                    value={formData.username}
                    onChange={handleChange}
                    required
                />
                <div className="invalid-feedback">{errors.username}</div>
            </div>

            <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                    type="email"
                    name="email"
                    className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                <div className="invalid-feedback">{errors.email}</div>
            </div>

            <div className="mb-3">
                <label className="form-label">Password</label>
                <input
                    type="password"
                    name="password"
                    className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
                <div className="invalid-feedback">{errors.password}</div>
                <div className="form-text">
                    Minimum {appConfig.auth.passwordRules.minLength} characters, including uppercase, lowercase, number, and special character.
                </div>
            </div>

            <div className="mb-3">
                <label className="form-label">Confirm Password</label>
                <input
                    type="password"
                    name="confirmPassword"
                    className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                />
                <div className="invalid-feedback">{errors.confirmPassword}</div>
            </div>

            <div className="form-check mb-4">
                <input
                    type="checkbox"
                    name="isTwoFactorEnabled"
                    className="form-check-input"
                    checked={formData.isTwoFactorEnabled}
                    onChange={handleChange}
                />
                <label className="form-check-label">
                    Enable Two-Factor Authentication
                </label>
            </div>

            <div className="d-grid gap-2">
                <button className="btn btn-primary" type="submit" disabled={loading}>
                    {loading ? 'Registering...' : 'Register'}
                </button>
                <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => navigate('/')}
                >
                    Back to Login
                </button>
            </div>
        </form>
    );
};

export default RegisterForm;

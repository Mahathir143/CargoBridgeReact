import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import CaptchaForm from './CaptchaForm';
import TwoFactorForm from './TwoFactorForm';
import { formatLockoutTime } from '../../utils/helpers';
import appConfig from '../../config/appConfig';

const LoginForm = () => {
    const navigate = useNavigate();
    const { login } = useAuth();

    const [formData, setFormData] = useState({ email: '', password: '' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [failedAttempts, setFailedAttempts] = useState(0);
    const [requiresCaptcha, setRequiresCaptcha] = useState(false);
    const [isLocked, setIsLocked] = useState(false);
    const [lockoutEnd, setLockoutEnd] = useState(null);
    const [twoFactorRequired, setTwoFactorRequired] = useState(false);
    const [captchaToken, setCaptchaToken] = useState('');
    const [remainingLockoutTime, setRemainingLockoutTime] = useState(0);

    useEffect(() => {
        if (isLocked && lockoutEnd) {
            const timer = setInterval(() => {
                const now = new Date();
                const remaining = Math.max(0, Math.floor((lockoutEnd - now) / 1000));
                setRemainingLockoutTime(remaining);

                if (remaining <= 0) {
                    setIsLocked(false);
                    setLockoutEnd(null);
                    clearInterval(timer);
                }
            }, 1000);

            return () => clearInterval(timer);
        }
    }, [isLocked, lockoutEnd]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleCaptchaVerified = (token) => {
        setCaptchaToken(token);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const loginData = requiresCaptcha ? { ...formData, captchaToken } : formData;
            const response = await login(loginData);

            if (response.twoFactorRequired) {
                setTwoFactorRequired(true);
            } else if (response.token) {
                navigate('/dashboard');
            }
        } catch (err) {
            setFailedAttempts(prev => prev + 1);

            if (err.isLocked || failedAttempts + 1 >= appConfig.auth.lockoutConfig.maxFailedAttempts) {
                setIsLocked(true);
                const lockoutDuration = appConfig.auth.lockoutConfig.lockoutDuration * 60;
                const lockEnd = new Date(Date.now() + lockoutDuration * 1000);
                setLockoutEnd(lockEnd);
                setRemainingLockoutTime(lockoutDuration);
                setError(err.error || 'Account is locked out due to too many failed attempts.');
                setRequiresCaptcha(false);
            } else if (err.requiresCaptcha || failedAttempts + 1 >= appConfig.auth.lockoutConfig.captchaThreshold) {
                setRequiresCaptcha(true);
                setError(err.error || 'Invalid credentials. CAPTCHA verification required.');
            } else {
                setError(err.error || 'Invalid email or password.');
            }
        } finally {
            setLoading(false);
        }
    };

    if (twoFactorRequired) {
        return <TwoFactorForm email={formData.email} />;
    }

    return (
        <>
            {isLocked && lockoutEnd && (
                <div className="alert alert-danger mb-4" role="alert">
                    <h4 className="alert-heading">Account Locked</h4>
                    <p>Your account has been temporarily locked due to multiple failed login attempts.</p>
                    <p>Please try again in {formatLockoutTime(remainingLockoutTime)}</p>
                </div>
            )}

            {!isLocked && error && (
                <div className="alert alert-danger" role="alert">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        disabled={isLocked}
                        placeholder="Enter email"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        disabled={isLocked}
                        placeholder="Password"
                    />
                </div>

                {requiresCaptcha && !isLocked && (
                    <div className="mb-4">
                        <CaptchaForm onCaptchaVerified={handleCaptchaVerified} inline={true} />
                    </div>
                )}

                <div className="d-grid">
                    <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={loading || isLocked || (requiresCaptcha && !captchaToken)}
                    >
                        {loading && (
                            <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true" />
                        )}
                        Login
                    </button>
                </div>
            </form>
        </>
    );
};

export default LoginForm;

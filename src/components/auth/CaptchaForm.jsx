import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ReCAPTCHA from 'react-google-recaptcha';
import { useAuth } from '../../hooks/useAuth';
import appConfig from '../../config/appConfig';

const CaptchaForm = ({ email, password }) => {
    const navigate = useNavigate();
    const { loginWithCaptcha } = useAuth();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [captchaToken, setCaptchaToken] = useState('');

    const handleCaptchaChange = (token) => setCaptchaToken(token);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await loginWithCaptcha({ email, password }, captchaToken);
            if (response.twoFactorRequired) {
                // handle 2FA redirect externally
            } else if (response.token) {
                navigate('/dashboard');
            }
        } catch (err) {
            setError(err.error || 'CAPTCHA verification failed.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="alert alert-warning">
                <h4 className="alert-heading">Verification Required</h4>
                <p>Please complete the CAPTCHA verification below.</p>
            </div>

            {error && <div className="alert alert-danger">{error}</div>}

            <div className="mb-4 d-flex justify-content-center">
                <ReCAPTCHA
                    sitekey={appConfig.recaptcha.siteKey}
                    onChange={handleCaptchaChange}
                />
            </div>

            <div className="d-grid gap-2">
                <button
                    className="btn btn-primary"
                    type="submit"
                    disabled={loading || !captchaToken}
                >
                    {loading ? 'Verifying...' : 'Verify and Login'}
                </button>
                <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => window.location.reload()}
                    disabled={loading}
                >
                    Cancel
                </button>
            </div>
        </form>
    );
};

export default CaptchaForm;

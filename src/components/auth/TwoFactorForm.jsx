import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import authService from '../../services/authService';

const TwoFactorForm = ({ email }) => {
    const navigate = useNavigate();
    const { verifyTwoFactor } = useAuth();

    const [token, setToken] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [tokenSent, setTokenSent] = useState(false);

    useEffect(() => {
        const requestToken = async () => {
            try {
                await authService.generateTwoFactorToken(email);
                setTokenSent(true);
            } catch {
                setError('Failed to request authentication code.');
            }
        };
        requestToken();
    }, [email]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            await verifyTwoFactor(email, token);
            navigate('/dashboard');
        } catch (err) {
            setError(err.error || 'Invalid code.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h4 className="mb-4">Two-Factor Authentication</h4>
            {error && <div className="alert alert-danger">{error}</div>}
            {tokenSent && <div className="alert alert-info">Code sent to your email or device.</div>}

            <div className="mb-4">
                <label className="form-label">Authentication Code</label>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Enter code"
                    value={token}
                    onChange={(e) => setToken(e.target.value)}
                    required
                />
                <div className="form-text">Check your email/device for the code.</div>
            </div>

            <div className="d-grid gap-2">
                <button className="btn btn-primary" type="submit" disabled={loading}>
                    {loading ? 'Verifying...' : 'Verify Code'}
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

export default TwoFactorForm;

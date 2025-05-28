import React from 'react';
import LoginForm from '../components/auth/LoginForm';
import Logo from '../components/common/Logo';

const LoginPage = () => {
    return (
        <div className="container py-5">
            <div className="row justify-content-center">
                <div className="col-md-6">

                    <div className="text-center mb-4">
                        <Logo height="80px" />
                    </div>

                    <div className="card shadow">
                        <div className="card-header bg-primary text-white text-center">
                            <h2 className="mb-0">Login</h2>
                        </div>
                        <div className="card-body">
                            <LoginForm />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;

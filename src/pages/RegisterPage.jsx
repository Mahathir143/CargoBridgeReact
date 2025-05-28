import React from 'react';
import RegisterForm from '../components/auth/RegisterForm';
import Logo from '../components/common/Logo';

const RegisterPage = () => {
    return (
        <div className="container py-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="text-center mb-4">
                        <Logo height="80px" />
                    </div>

                    <div className="card shadow">
                        <div className="card-header bg-primary text-white">
                            <h2 className="text-center mb-0">Register</h2>
                        </div>
                        <div className="card-body">
                            <RegisterForm />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;

import React, { useState, useEffect } from 'react';
import SkeletonLoader from '../components/SkeletonLoader';
import { showToast } from '../services/toastService';
import { showAlert } from '../services/alertService';

const Home = () => {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);

    useEffect(() => {
        // Simulate loading
        setTimeout(() => {
            setData([
                { id: 1, title: 'Welcome to CargoBridge V2', description: 'Modern cargo management' },
                { id: 2, title: 'PWA Enabled', description: 'Install on mobile devices' },
                { id: 3, title: 'Bootstrap 5 UI', description: 'Beautiful responsive design' }
            ]);
            setLoading(false);
        }, 2000);
    }, []);

    const handleTestToast = () => {
        showToast.success('Welcome to CargoBridge V2! 🚛');
    };

    const handleTestAlert = async () => {
        const confirmed = await showAlert.confirm(
            'Test Confirmation',
            'This is a test confirmation dialog using SweetAlert2'
        );

        if (confirmed) {
            showToast.success('You confirmed the action!');
        } else {
            showToast.info('Action cancelled');
        }
    };

    return (
        <div className="container py-4">
            <div className="row">
                <div className="col-12">
                    <div className="text-center mb-5">
                        <h1 className="display-4 text-primary">
                            <i className="bi bi-truck me-3"></i>
                            CargoBridge V2
                        </h1>
                        <p className="lead">Modern Cargo Management System</p>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-md-8">
                    <h3 className="mb-4">Features</h3>

                    {loading ? (
                        <SkeletonLoader type="card" count={3} />
                    ) : (
                        <div className="row">
                            {data.map(item => (
                                <div key={item.id} className="col-md-6 mb-3">
                                    <div className="card h-100">
                                        <div className="card-body">
                                            <h5 className="card-title">{item.title}</h5>
                                            <p className="card-text">{item.description}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className="col-md-4">
                    <div className="card">
                        <div className="card-header">
                            <h5 className="card-title mb-0">Test Features</h5>
                        </div>
                        <div className="card-body">
                            <div className="d-grid gap-2">
                                <button
                                    className="btn btn-success"
                                    onClick={handleTestToast}
                                >
                                    <i className="bi bi-bell me-2"></i>
                                    Test Toast
                                </button>

                                <button
                                    className="btn btn-warning"
                                    onClick={handleTestAlert}
                                >
                                    <i className="bi bi-exclamation-triangle me-2"></i>
                                    Test Alert
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
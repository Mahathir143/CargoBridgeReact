import React, { useState, useEffect } from 'react';
import SkeletonLoader from '../components/SkeletonLoader';

const Dashboard = () => {
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({});

    useEffect(() => {
        setTimeout(() => {
            setStats({
                totalCargo: 1234,
                activeCargo: 89,
                completedCargo: 1145,
                pendingCargo: 56
            });
            setLoading(false);
        }, 1500);
    }, []);

    if (loading) {
        return (
            <div className="container py-4">
                <div className="row">
                    {Array.from({ length: 4 }, (_, i) => (
                        <div key={i} className="col-md-3 mb-4">
                            <SkeletonLoader type="card" />
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="container py-4">
            <h2 className="mb-4">Dashboard</h2>

            <div className="row">
                <div className="col-md-3 mb-4">
                    <div className="card text-white bg-primary">
                        <div className="card-body">
                            <div className="d-flex justify-content-between">
                                <div>
                                    <h4>{stats.totalCargo}</h4>
                                    <span>Total Cargo</span>
                                </div>
                                <i className="bi bi-boxes display-6"></i>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-md-3 mb-4">
                    <div className="card text-white bg-success">
                        <div className="card-body">
                            <div className="d-flex justify-content-between">
                                <div>
                                    <h4>{stats.activeCargo}</h4>
                                    <span>Active</span>
                                </div>
                                <i className="bi bi-truck display-6"></i>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-md-3 mb-4">
                    <div className="card text-white bg-info">
                        <div className="card-body">
                            <div className="d-flex justify-content-between">
                                <div>
                                    <h4>{stats.completedCargo}</h4>
                                    <span>Completed</span>
                                </div>
                                <i className="bi bi-check-circle display-6"></i>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-md-3 mb-4">
                    <div className="card text-white bg-warning">
                        <div className="card-body">
                            <div className="d-flex justify-content-between">
                                <div>
                                    <h4>{stats.pendingCargo}</h4>
                                    <span>Pending</span>
                                </div>
                                <i className="bi bi-clock display-6"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
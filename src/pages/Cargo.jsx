import React, { useState, useEffect } from 'react';
import SkeletonLoader from '../components/SkeletonLoader';
import { showToast } from '../services/toastService';
import { showAlert } from '../services/alertService';

const Cargo = () => {
    const [loading, setLoading] = useState(true);
    const [cargoList, setCargoList] = useState([]);

    useEffect(() => {
        setTimeout(() => {
            setCargoList([
                { id: 1, name: 'Electronics Shipment', status: 'In Transit', destination: 'New York', weight: '2.5 tons' },
                { id: 2, name: 'Medical Supplies', status: 'Delivered', destination: 'Boston', weight: '1.2 tons' },
                { id: 3, name: 'Auto Parts', status: 'Pending', destination: 'Chicago', weight: '3.8 tons' },
                { id: 4, name: 'Textiles', status: 'In Transit', destination: 'Los Angeles', weight: '1.9 tons' }
            ]);
            setLoading(false);
        }, 1800);
    }, []);

    const handleDelete = async (id, name) => {
        const confirmed = await showAlert.delete(`cargo shipment "${name}"`);

        if (confirmed) {
            setCargoList(prev => prev.filter(item => item.id !== id));
            showToast.success(`Cargo "${name}" deleted successfully`);
        }
    };

    const getStatusBadge = (status) => {
        const statusClasses = {
            'In Transit': 'bg-primary',
            'Delivered': 'bg-success',
            'Pending': 'bg-warning text-dark'
        };
        return `badge ${statusClasses[status] || 'bg-secondary'}`;
    };

    return (
        <div className="container py-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Cargo Management</h2>
                <button className="btn btn-primary">
                    <i className="bi bi-plus-circle me-2"></i>
                    Add Cargo
                </button>
            </div>

            <div className="card">
                <div className="card-header">
                    <h5 className="card-title mb-0">Cargo List</h5>
                </div>
                <div className="card-body">
                    {loading ? (
                        <div className="table-responsive">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Status</th>
                                        <th>Destination</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <SkeletonLoader type="table" count={4} />
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="table-responsive">
                            <table className="table table-hover">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Status</th>
                                        <th>Destination</th>
                                        <th>Weight</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cargoList.map(cargo => (
                                        <tr key={cargo.id}>
                                            <td>{cargo.name}</td>
                                            <td>
                                                <span className={getStatusBadge(cargo.status)}>
                                                    {cargo.status}
                                                </span>
                                            </td>
                                            <td>{cargo.destination}</td>
                                            <td>{cargo.weight}</td>
                                            <td>
                                                <div className="btn-group btn-group-sm">
                                                    <button className="btn btn-outline-primary">
                                                        <i className="bi bi-eye"></i>
                                                    </button>
                                                    <button className="btn btn-outline-secondary">
                                                        <i className="bi bi-pencil"></i>
                                                    </button>
                                                    <button
                                                        className="btn btn-outline-danger"
                                                        onClick={() => handleDelete(cargo.id, cargo.name)}
                                                    >
                                                        <i className="bi bi-trash"></i>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Cargo;
import React from 'react';

const About = () => {
    return (
        <div className="container py-4">
            <div className="row justify-content-center">
                <div className="col-lg-8">
                    <div className="text-center mb-5">
                        <h2>About CargoBridge V2</h2>
                        <p className="lead">Modern cargo management solution built with cutting-edge technologies</p>
                    </div>

                    <div className="card">
                        <div className="card-body">
                            <h4>Technologies Used</h4>
                            <div className="row mt-4">
                                <div className="col-md-6">
                                    <ul className="list-group list-group-flush">
                                        <li className="list-group-item d-flex align-items-center">
                                            <i className="bi bi-check-circle text-success me-2"></i>
                                            React 18
                                        </li>
                                        <li className="list-group-item d-flex align-items-center">
                                            <i className="bi bi-check-circle text-success me-2"></i>
                                            Vite
                                        </li>
                                        <li className="list-group-item d-flex align-items-center">
                                            <i className="bi bi-check-circle text-success me-2"></i>
                                            Bootstrap 5
                                        </li>
                                        <li className="list-group-item d-flex align-items-center">
                                            <i className="bi bi-check-circle text-success me-2"></i>
                                            React Router
                                        </li>
                                    </ul>
                                </div>
                                <div className="col-md-6">
                                    <ul className="list-group list-group-flush">
                                        <li className="list-group-item d-flex align-items-center">
                                            <i className="bi bi-check-circle text-success me-2"></i>
                                            PWA Support
                                        </li>
                                        <li className="list-group-item d-flex align-items-center">
                                            <i className="bi bi-check-circle text-success me-2"></i>
                                            SweetAlert2
                                        </li>
                                        <li className="list-group-item d-flex align-items-center">
                                            <i className="bi bi-check-circle text-success me-2"></i>
                                            React Hot Toast
                                        </li>
                                        <li className="list-group-item d-flex align-items-center">
                                            <i className="bi bi-check-circle text-success me-2"></i>
                                            Bootstrap Icons
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
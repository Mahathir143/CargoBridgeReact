import React from 'react';

const SkeletonLoader = ({ type = 'default', count = 1 }) => {
    const renderSkeleton = () => {
        switch (type) {
            case 'card':
                return (
                    <div className="card">
                        <div className="card-body">
                            <div className="placeholder-glow">
                                <span className="placeholder col-6"></span>
                                <span className="placeholder col-4"></span>
                                <span className="placeholder col-4"></span>
                                <span className="placeholder col-6"></span>
                                <span className="placeholder col-8"></span>
                            </div>
                        </div>
                    </div>
                );

            case 'table':
                return (
                    <tr>
                        <td><span className="placeholder col-8"></span></td>
                        <td><span className="placeholder col-6"></span></td>
                        <td><span className="placeholder col-4"></span></td>
                        <td><span className="placeholder col-7"></span></td>
                    </tr>
                );

            case 'list':
                return (
                    <li className="list-group-item">
                        <div className="placeholder-glow">
                            <span className="placeholder col-7"></span>
                            <span className="placeholder col-4"></span>
                        </div>
                    </li>
                );

            default:
                return (
                    <div className="placeholder-glow">
                        <span className="placeholder col-7"></span>
                        <span className="placeholder col-4"></span>
                        <span className="placeholder col-4"></span>
                        <span className="placeholder col-6"></span>
                        <span className="placeholder col-8"></span>
                    </div>
                );
        }
    };

    return (
        <>
            {Array.from({ length: count }, (_, index) => (
                <div key={index} className="mb-3">
                    {renderSkeleton()}
                </div>
            ))}
        </>
    );
};

export default SkeletonLoader;
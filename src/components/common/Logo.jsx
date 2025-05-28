import React from 'react';
import appConfig from '../../config/appConfig';

const Logo = ({ height = '60px', className = '' }) => {
    return (
        <img
            src={appConfig.ui.logoUrl}
            alt="Cargo Bridge Logo"
            height={height}
            className={className}
        />
    );
};

export default Logo;
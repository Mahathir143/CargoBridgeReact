import React from 'react';
import { Spinner, Container } from 'react-bootstrap';

const Loading = ({ message = 'Loading...' }) => {
    return (
        <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '200px' }}>
            <div className="text-center">
                <Spinner animation="border" variant="primary" />
                <p className="mt-2">{message}</p>
            </div>
        </Container>
    );
};

export default Loading;
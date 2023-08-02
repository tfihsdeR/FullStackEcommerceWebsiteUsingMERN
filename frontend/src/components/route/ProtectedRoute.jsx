import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ element }) {

    // const navigate = useNavigate()

    const { isAuthenticated, loading } = useSelector(state => state.auth);

    if (!loading) {
        if (isAuthenticated) {
            return element
        } else {
            return <Navigate to="/login" replace />
        }
    }
}

export default ProtectedRoute;

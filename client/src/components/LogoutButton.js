// src/components/LogoutButton.js
import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function LogoutButton() {
    const { logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return <button onClick={handleLogout}>Logout</button>;
}

export default LogoutButton;

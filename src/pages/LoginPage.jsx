import React from 'react';
import { Link } from 'react-router-dom';
import LoginForm from '../components/LoginForm';

const LoginPage = () => {
    return (
        <div className="card center">
            <div className="card-body">
                <h1 className="m-3">Admin Login</h1>
                <LoginForm />
                <div className="text-center">
                    Don't have a login? Sign up <Link to="/signup">here</Link>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;
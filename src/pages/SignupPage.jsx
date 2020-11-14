import React from 'react';
import SignupForm from '../components/SignupForm';

const SignupPage = () => {
    return (
        <div className="card center">
            <div className="card-body">
                <h1 className="m-3">Admin Sign Up</h1>
                <SignupForm />
            </div>
        </div>
    );
}

export default SignupPage;
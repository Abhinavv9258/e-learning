import React from 'react';

const AuthorizationRequired = () => {
    return (
        <div>
            <h2>403 - Forbidden | Authorization Required</h2>
            <p>You do not have the necessary permissions to access this page.</p>
        </div>
    );
}

export default AuthorizationRequired;

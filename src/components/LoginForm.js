import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import './styles.css';

const LoginForm = () => {
    const { login } = useAuth();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        const result = login(username.trim(), password);

        if (!result.success) {
            setError('Invalid username or password');
            return;
        }


    };

    return (
        <div className="login-container">
            <h1>Task Management Login</h1>

            <form onSubmit={handleSubmit} className='login-form'>
                <label>
                    <span>Username</span>
                    <input type='text' value={username} autoComplete='username' onChange={(e) => setUsername(e.target.value)} required/>
                    </label>

                <label>
                    <span>Password</span>
                    <input type='password' value={password} autoComplete='current-password' onChange={(e) => setPassword(e.target.value)} required/>
                </label>
                    

                    {error && <p className='error-message'>{error}</p>}

                    <button type="submit">Login</button>
                 {/*}
                    <div className='credentials-hint'>
                        <p>
                            <strong>Admin</strong>: admin / admin123
                        </p>
                        <p>
                            <strong>User</strong>: user1 / user123
                        </p>
                    </div> */}
                
            </form>
        </div>
    );
};

export default LoginForm;
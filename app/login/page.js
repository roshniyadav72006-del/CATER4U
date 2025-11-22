'use client'; 

import React, { useState } from 'react';
import Link from 'next/link';

export default function LoginPage() {
    const [emailOrUsername, setEmailOrUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        if (!emailOrUsername || !password) {
            setError('Both fields are required.');
            setLoading(false);
            return;
        }

        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ identifier: emailOrUsername, password }),
            });

            if (response.ok) {
                console.log('Login Successful');
                window.location.href = '/dashboard'; 
            } else {
                const data = await response.json();
                setError(data.message || 'Login failed. Please check your credentials.');
            }
        } catch (err) {
            console.error('Login Error:', err);
            setError('An unexpected error occurred. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container">
            <div className="form-card">
                
                {/* 1. LEFT SIDE: Welcome/Register Prompt (Purple Background, CONNECTED to /register) */}
                <div className="welcome-prompt-section">
                    <h1>Hello, Welcome!</h1>
                    <p>Don't have an account?</p>
                    {/* यह बटन Register पेज पर जाता है और अब इस पर राउंड आउटलाइन है */}
                    <Link href="/register" className="register-prompt-button">
                        Register
                    </Link>
                </div>

                {/* 2. RIGHT SIDE: Login Form (White Background) */}
                <div className="login-form-section">
                    <h2>LOGIN</h2>
                    <form onSubmit={handleSubmit} className="login-form">
                        
                        <div className="input-group">
                            <input
                                type="text"
                                id="identifier"
                                placeholder="Username or Email"
                                value={emailOrUsername}
                                onChange={(e) => setEmailOrUsername(e.target.value)}
                                required
                            />
                            <span className="icon">👤</span>
                        </div>
                        
                        <div className="input-group">
                            <input
                                type="password"
                                id="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <span className="icon">🔒</span>
                        </div>

                        {/* Forgot Password Link */}
                        <Link href="/forgot-password" className="forgot-password-link">
                            Forgot password?
                        </Link>

                        {error && <p className="error-message">{error}</p>}

                        <button type="submit" className="login-button" disabled={loading}>
                            {loading ? 'LOGGING IN...' : 'LOGIN'}
                        </button>
                    </form>
                </div>
            </div>

            <style jsx>{`
                .container {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    min-height: 100vh;
                    background-color: #f0f2f5; 
                    font-family: 'Arial', sans-serif;
                }
                .form-card {
                    display: flex;
                    background-color: #ffffff;
                    border-radius: 20px;
                    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
                    overflow: hidden;
                    width: 100%;
                    max-width: 900px;
                    min-height: 500px;
                }

                /* 1. LEFT SIDE: Welcome Prompt (Purple & Curved) */
                .welcome-prompt-section {
                    flex: 1;
                    background: linear-gradient(135deg, #6a0dad 0%, #8a2be2 100%);
                    color: white;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    padding: 50px;
                    text-align: center;
                    clip-path: ellipse(150% 100% at 100% 50%); 
                }
                .welcome-prompt-section h1 {
                    font-size: 42px;
                    margin-bottom: 15px;
                    font-weight: bold;
                }
                .welcome-prompt-section p {
                    font-size: 18px;
                    margin-bottom: 30px;
                }
                .register-prompt-button {
                    /* BUTTON WITH ROUND OUTLINE */
                    padding: 10px 28px;
                    background-color: transparent;
                    color: white;
                    border: 2px solid white;
                    border-radius: 50px;
                    text-decoration: none;
                    font-size: 18px;
                    font-weight: bold;
                    transition: background-color 0.3s ease;
                    text-transform: uppercase;
                }
                .register-prompt-button:hover {
                    background-color: rgba(255, 255, 255, 0.1);
                    color: white;
                }

                /* 2. RIGHT SIDE: Login Form (White) */
                .login-form-section {
                    flex: 1;
                    padding: 50px;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    position: relative;
                }
                .login-form-section h2 {
                    color: #333;
                    font-size: 32px;
                    margin-bottom: 40px;
                    font-weight: bold;
                    width: 100%;
                    text-align: center;
                    text-transform: uppercase; 
                }
                .login-form {
                    width: 100%;
                }
                .input-group {
                    position: relative;
                    margin-bottom: 25px;
                }
                .input-group input {
                    width: calc(100% - 40px);
                    padding: 12px 15px 12px 40px;
                    border: 1px solid #ddd;
                    border-radius: 8px;
                    font-size: 16px;
                    background-color: #fcfcfc;
                    box-shadow: inset 0 1px 3px rgba(0,0,0,0.05);
                }
                .input-group input:focus {
                    border-color: #6a0dad;
                    outline: none;
                    box-shadow: 0 0 0 3px rgba(106, 13, 173, 0.15);
                }
                .input-group .icon {
                    position: absolute;
                    left: 15px;
                    top: 50%;
                    transform: translateY(-50%);
                    color: #888;
                    font-size: 18px;
                }
                .forgot-password-link {
                    align-self: flex-end;
                    margin-top: -15px;
                    margin-bottom: 30px;
                    color: #6a0dad;
                    text-decoration: none;
                    font-size: 14px;
                    transition: color 0.3s;
                }
                .forgot-password-link:hover {
                    text-decoration: underline;
                    color: #5a0baa;
                }
                .login-button {
                    width: 100%;
                    padding: 15px;
                    background-color: #6a0dad;
                    color: white;
                    border: none;
                    border-radius: 8px;
                    cursor: pointer;
                    font-size: 18px;
                    font-weight: bold;
                    letter-spacing: 0.5px;
                    transition: background-color 0.3s ease;
                    margin-top: 10px;
                    text-transform: uppercase;
                }
                .login-button:hover:not(:disabled) {
                    background-color: #5a0baa;
                }
                .login-button:disabled {
                    background-color: #b187e1;
                    cursor: not-allowed;
                }
                .error-message {
                    color: #d9534f;
                    margin-top: -15px;
                    margin-bottom: 20px;
                    font-size: 14px;
                    text-align: center;
                    width: 100%;
                }

                /* Responsive adjustments */
                @media (max-width: 768px) {
                    .form-card {
                        flex-direction: column;
                        max-width: 500px;
                        min-height: auto;
                    }
                    .welcome-prompt-section, .login-form-section {
                        padding: 30px;
                        clip-path: none !important;
                    }
                    .welcome-prompt-section {
                        border-radius: 20px 20px 0 0;
                    }
                    .login-form-section h2 {
                        font-size: 28px;
                        margin-bottom: 30px;
                    }
                    .welcome-prompt-section h1 {
                        font-size: 36px;
                    }
                }
            `}</style>
        </div>
    );
}

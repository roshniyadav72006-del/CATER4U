'use client'; 
import React, { useState } from 'react';
import Link from 'next/link';

export default function RegisterPage() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // New state variables for phone and address
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        // --- Frontend Validation ---
        if (!username || !email || !password || !phone || !address) { // Added phone and address to validation
            setError('All fields are required.');
            setLoading(false);
            return;
        }
        if (password.length < 6) {
            setError('Password must be at least 6 characters long.');
            setLoading(false);
            return;
        }
        // Basic phone number validation (can be more robust)
        const phoneRegex = /^\d{10}$/; // Assumes a 10-digit phone number
        if (!phoneRegex.test(phone)) {
            setError('Phone number must be 10 digits.');
            setLoading(false);
            return;
        }
        // --- End Frontend Validation ---

        try {
            // Call your backend API route for registration
            const response = await fetch('/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                // Include new fields in the body
                body: JSON.stringify({ username, email, password, phone, address }),
            });

            if (response.ok) {
                console.log('Registration Successful');
                window.location.href = '/login'; 
            } else {
                const data = await response.json();
                setError(data.message || 'Registration failed. Please try again.');
            }
        } catch (err) {
            console.error('Registration Error:', err);
            setError('An unexpected error occurred. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container">
            <div className="form-card">
                {/* Left side: Registration Form (White) */}
                <div className="registration-section">
                    <h2>REGISTRATION</h2>
                    <form onSubmit={handleSubmit} className="registration-form">
                        <div className="input-group">
                            <input
                                type="text"
                                id="username"
                                placeholder="Username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                            <span className="icon">👤</span>
                        </div>
                        <div className="input-group">
                            <input
                                type="email"
                                id="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <span className="icon">✉️</span>
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

                        {/* NEW FIELD: Phone Number */}
                        <div className="input-group">
                            <input
                                type="tel" // Use type="tel" for phone numbers
                                id="phone"
                                placeholder="Phone Number"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                required
                            />
                            <span className="icon">📞</span> {/* Phone icon */}
                        </div>

                        {/* NEW FIELD: Address */}
                        <div className="input-group">
                            <input
                                type="text" 
                                id="address"
                                placeholder="Address"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                required
                            />
                            <span className="icon">🏠</span> {/* House/Address icon */}
                        </div>

                        {error && <p className="error-message">{error}</p>}

                        <button type="submit" className="register-button" disabled={loading}>
                            {loading ? 'REGISTERING...' : 'REGISTER'}
                        </button>
                    </form>
                </div>

                {/* Right side: Welcome Back / Login Prompt (Purple) */}
                <div className="welcome-section">
                    <h1>Welcome Back!</h1>
                    <p>Already have an account?</p>
                    <Link href="/login" className="login-prompt-button">
                        LOGIN
                    </Link>
                </div>
            </div>

            <style jsx>{`
                .container {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    min-height: 100vh;
                    background-color: ;
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
                    min-height: 500px; /* May need adjustment if form becomes too long */
                }

                /* Registration Section (Left Side - White Box) */
                .registration-section {
                    flex: 1;
                    padding: 50px;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center; 
                    position: relative;
                }
                .registration-section h2 {
                    color: #333;
                    font-size: 32px;
                    margin-bottom: 40px;
                    font-weight: bold;
                    width: 100%;
                    text-align: center; 
                    text-transform: uppercase; 
                }
                .registration-form {
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
                .register-button {
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
                .register-button:hover:not(:disabled) {
                    background-color: #5a0baa;
                }
                .register-button:disabled {
                    background-color: #b187e1;
                    cursor: not-allowed;
                }
                .error-message {
                    color: #d9534f;
                    margin-top: -15px;
                    margin-bottom: 20px;
                    font-size: 14px;
                    text-align: center;
                }

                /* Welcome Section (Right Side - Purple Box) */
                .welcome-section {
                    flex: 1;
                    background: linear-gradient(135deg, #6a0dad 0%, #8a2be2 100%); 
                    color: white;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    padding: 50px;
                    text-align: center;
                    border-radius: 0 20px 20px 0; 
                }
                .welcome-section h1 {
                    font-size: 42px;
                    margin-bottom: 15px;
                    font-weight: bold;
                }
                .welcome-section p {
                    font-size: 18px;
                    margin-bottom: 30px;
                }
                .login-prompt-button {
                    padding: 10px 28px;
                    background-color: white; 
                    color: #6a0dad; 
                    border: none; 
                    border-radius: 50px; 
                    text-decoration: none;
                    font-size: 18px;
                    font-weight: bold;
                    transition: background-color 0.3s ease, color 0.3s ease;
                    text-transform: uppercase;
                    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); 
                }
                .login-prompt-button:hover {
                    background-color: #f0f0f0; 
                    color: #5a0baa;
                }

                /* Responsive adjustments */
                @media (max-width: 768px) {
                    .form-card {
                        flex-direction: column;
                        max-width: 500px;
                        min-height: auto; /* Allow height to adjust for more fields */
                    }
                    .registration-section, .welcome-section {
                        padding: 30px;
                    }
                    .welcome-section {
                        border-radius: 0 0 20px 20px;
                    }
                    .registration-section h2 {
                        font-size: 28px;
                        margin-bottom: 30px;
                    }
                    .welcome-section h1 {
                        font-size: 36px;
                    }
                }
            `}</style>
        </div>
    );
}   
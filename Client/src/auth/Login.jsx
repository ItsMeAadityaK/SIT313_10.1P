import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';  // Import Firebase authentication
import { signInWithEmailAndPassword } from 'firebase/auth';  // Import signInWithEmailAndPassword
import './Login.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            // Use signInWithEmailAndPassword with auth passed as the first argument
            await signInWithEmailAndPassword(auth, email, password);
            navigate('/');
        } catch (error) {
            setErrorMessage(error.message);
        }
    };

    return (
        <div className="login-container">
            <div className="signup-link">
                <button
                    className="signup-button"
                    onClick={() => navigate('/signup')}
                >
                    Sign up
                </button>
            </div>

            <h2>Login</h2>

            {errorMessage && <p className="error-message">{errorMessage}</p>}

            <input
                type="email"
                placeholder="Your email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                className="login-input"
            />
            <input
                type="password"
                placeholder="Your password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                className="login-input"
            />

            <button onClick={handleLogin} className="login-button">Login</button>
        </div>
    );
};

export default Login;

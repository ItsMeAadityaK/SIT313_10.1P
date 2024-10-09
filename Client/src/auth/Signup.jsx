import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../firebase';  // Ensure this is correctly imported from your firebase config
import { createUserWithEmailAndPassword } from 'firebase/auth';  // Import the auth function
import { setDoc, doc } from 'firebase/firestore';  // Firestore methods
import './Signup.css';

const Signup = () => {
    const [userDetails, setUserDetails] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');  // Added success message
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserDetails(prevDetails => ({
            ...prevDetails,
            [name]: value
        }));
    };

    const handleSignup = async () => {
        const { name, email, password, confirmPassword } = userDetails;
        if (password !== confirmPassword) {
            setErrorMessage("Passwords do not match");
            return;
        }
        try {
            // Use createUserWithEmailAndPassword with auth passed as an argument
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const uid = userCredential.user.uid;

            // Store user data in Firestore
            await setDoc(doc(db, 'users', uid), {
                name: name,
                email: email,
                uid: uid,
                createdAt: new Date()
            });
            
            setSuccessMessage('User created and data saved to Firestore!');
            setErrorMessage('');  // Clear error message if success
            navigate('/login');
        } catch (error) {
            // Handle both Firebase auth and Firestore errors
            if (error.code === 'auth/email-already-in-use') {
                setErrorMessage('The email address is already in use. Please use another email.');
            } else {
                setErrorMessage(error.message);
            }
            console.error("Error writing document: ", error);
        }
    };

    return (
        <div className="signup-container">
            <h2>Create a DEV@Deakin Account</h2>

            {errorMessage && <p className="error-message">{errorMessage}</p>}
            {successMessage && <p className="success-message">{successMessage}</p>}

            <input
                type="text"
                name="name"
                placeholder="Name*"
                onChange={handleChange}
                value={userDetails.name}
                className="signup-input"
            />

            <input
                type="email"
                name="email"
                placeholder="Email*"
                onChange={handleChange}
                value={userDetails.email}
                className="signup-input"
            />

            <input
                type="password"
                name="password"
                placeholder="Password*"
                onChange={handleChange}
                value={userDetails.password}
                className="signup-input"
            />

            <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm password*"
                onChange={handleChange}
                value={userDetails.confirmPassword}
                className="signup-input"
            />

            <button onClick={handleSignup} className="signup-button">Create</button>
        </div>
    );
};

export default Signup;

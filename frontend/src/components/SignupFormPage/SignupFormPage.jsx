import { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import "./SignupForm.css"


const SignupFormPage = () => {
    const dispatch = useDispatch();
    let sessionUser = useSelector((state) => state.session.user);
    const [username, setUsername] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState({});

    if (sessionUser) return <Navigate to="/" replace={true} />

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password === confirmPassword) {
            setErrors({});
            return dispatch(sessionActions.signup({ username, firstName, lastName, email, password })).catch(
                async (res) => {
                    const data = await res.json();
                    if (data?.errors) setErrors(data.errors);
                }
            );
        }
        return setErrors({
            confirmPassword: "Confirm Password field must be the same as the Password field"
        });
    };

    return (
        <>
        <h1>Sign Up</h1>
        <div className="form-parent-container">
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                {errors.email && <p>{errors.email}</p>}
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                {errors.username && <p>{errors.username}</p>}
                <input
                    type="text"
                    placeholder="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                />
                {errors.firstName && <p>{errors.firstName}</p>}
                <input
                    type="text"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                />
                {errors.lastName && <p>{errors.lastName}</p>}
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                {errors.password && <p>{errors.password}</p>}
                <input
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />
                {errors.confirmPassword && <p>{errors.confirmPassword}</p>}
                <button type="submit">Enter</button>
            </form>
        </div>
        </>
    )
}

export default SignupFormPage;

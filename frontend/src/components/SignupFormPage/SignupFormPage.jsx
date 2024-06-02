import { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import "./SignupForm.css"


const SignupFormPage = () => {
    const dispatch = useDispatch();
    let newUser = useSelector((state) => state.session.user);
    const [username, setUsername] = useState("");
    const [firstName, setfirstName] = useState("");
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
                    checked
                    required
                />
                <input
                    type="errors.email && <p>{errors.email}</p>"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                {errors.credential && <p>{errors.credential}</p>}
                <button type="submit">Enter</button>
            </form>
        </div>
        </>
    )
}

export default SignupFormPage;

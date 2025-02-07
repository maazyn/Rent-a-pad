import { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import "./LoginForm.css"


const LoginFormModal = () => {
    const dispatch = useDispatch();
    const [credential, setCredential] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});
    const { closeModal } = useModal();

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors({});
        return dispatch(sessionActions.login({ credential, password }))
            .then(closeModal).catch(async (res) => {
            const data = await res.json();
            if (data && data.errors) {
                setErrors(data.errors);
            }});
    };

    // const demoLogin = async (e) => {
    //     e.preventDefault();
    //     setCredential("Demo-lition");
    //     setPassword("password");
    //     dispatch(sessionActions.login({ credential, password }))
    //         .then(closeModal).catch(async (res) => {
    //         const data = await res.json();
    //         if (data && data.errors) {
    //           setErrors(data.errors);
    //         }});
    // };

    const demoLogin = async (e) => {
        e.preventDefault();
        setErrors({})
        dispatch(sessionActions.login({ credential: "Demo-lition", password: "password" }))
            .then(closeModal)
            .catch(async (res) => {
                const data = await res.json();
                if (data && data?.errors) setErrors(data.errors)
            })
    }


    return (
        <>
        <h1 className="form-heading">Welcome back!</h1>
        <div className="form-parent-container">
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Username or Email"
                    value={credential}
                    onChange={(e) => setCredential(e.target.value)}
                    required
                    />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    />
                {errors.credential && <p>{errors.credential}</p>}
                <div className='login-buttons-container'>
                    <button className="enter-button" type="submit">Log in</button>
                    <button className="enter-demo-button" onClick={demoLogin} type="submit">Demo-User</button>
                </div>
            </form>
        </div>
        </>
    )
}

export default LoginFormModal;

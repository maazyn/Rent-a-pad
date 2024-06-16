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
          .then(closeModal)
          .catch(async (res) => {
            const data = await res.json();
            if (data && data.errors) {
              setErrors(data.errors);
            }
        });
    };

    const demoLogin = async (e) => {
        e.preventDefault();
        setCredential("Demo-lition");
        setPassword("password");
        return await dispatch(sessionActions.login(
            {
                credential,
                password
            }
        )).then(closeModal).catch(async (res) => {
            const data = await res.json();
            if (data && data.errors) {
              setErrors(data.errors);
            }
        });
    };


    return (
        <>
        <h1 className="form-heading">Log In</h1>
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
                <button disabled={credential.length < 4 || password.length < 6} className="enter-button" type="submit">Enter</button>
                <button className="enter-demo-button" onClick={demoLogin} type="submit">Demo-User</button>
            </form>
        </div>
        </>
    )
}

export default LoginFormModal;

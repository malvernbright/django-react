import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../constants';
import "../styles/Form.css";
import LoadingIndicator from './LoadingIndicator';

export default function Form({ route, method }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const name = method === "login" ? "Login" : "Register";

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        try {
            await api.post(route, { username, password })
                .then((res) => {
                    if (method === "login") {
                        if (localStorage.getItem(ACCESS_TOKEN)) {
                            navigate('/');
                        }
                        else {
                            localStorage.setItem(ACCESS_TOKEN, res.data.access);
                            localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
                            navigate('/');
                        }
                    } else {
                        alert("Registration successful, please login");
                        navigate('/login');
                    }
                })

        } catch (error) {
            console.log(error);
            alert(error);
        } finally {
            setLoading(false);
            // setLoading(false);
            // setUsername('');
            // setPassword('');
            // return;
        }

    }
    return (
        <div className='form-container'>
            <form onSubmit={handleSubmit}>
                <h1>{name}</h1>
                <input className='form-input' type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                <input className='form-input' type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                {loading && <LoadingIndicator />}
                <button className='form-button' type="submit" disabled={loading}>{name}</button>
            </form>
            {
                method === "login" ?
                    <p>Don&apos;t have an account? <a href="/register">Register</a></p>
                    : <p>Already have an account? <a href="/login">Login</a></p>
            }
        </div>

    )
}

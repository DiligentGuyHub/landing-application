import {useState} from "react";
import axios from "axios";
import { useDispatch, useSelector} from "react-redux";
import {RootState} from "../reducers/RootReducer";
import {loginFailure, loginRequest, loginSuccess} from "../actions/authorizationActions";

export const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const loading = useSelector((state: RootState) => state.authorization.loading);
    const error = useSelector((state: RootState) => state.authorization.error);

    const dispatch = useDispatch();

    const handleLogin = async () => {
        dispatch(loginRequest());
        console.log(username, password);
        try {
            const response = await axios.post('http://localhost:4000/admin-api/login', {
                username,
                password,
            });

            const token = response.data.token;
            dispatch(loginSuccess(token));
            console.log('Logged in!');
        } catch (error) {
            console.error('Login error:', error);
            dispatch(loginFailure('Login failed. Please try again.'));
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <div>
                <label>Username:</label>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>
            <div>
                <label>Password:</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <button onClick={handleLogin} disabled={loading}>
                {loading ? 'Logging in...' : 'Login'}
            </button>
            {error && <p>{error}</p>}
        </div>
    );
};
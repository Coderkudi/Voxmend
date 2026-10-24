import { useState , type FormEvent} from 'react';
import { useAuth } from '../context/AuthContext';
import { loginUser } from "@/api/auth.api";
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const data = await loginUser(email, password);
            login(data.token, data.user);
            navigate("/dashboard");
            // console.log("Login successful:", data);

        } catch (error) {
            console.error('Authentication error: ', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Login</h2>
            <input
                type='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder='Email'
                required
            />
            <input
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder='Password'
                required
            />
            <button type='submit'>Log In</button>
        </form>
    );
};

export default LoginPage;

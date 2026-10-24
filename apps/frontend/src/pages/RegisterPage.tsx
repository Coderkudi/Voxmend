import { useState , type FormEvent} from 'react';
import { registerUser } from "@/api/auth.api";


const RegisterPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const data = await registerUser(name, email, password);
            console.log("Register successful", data);
        } catch (error) {
            console.error("Error registering user:", error);
        }
    };

    return (
        <form onSubmit={ handleSubmit }>
            <h2>Register</h2>

            <input
                type='text'
                placeholder='name'
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <input
                type='email'
                placeholder='Email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type='password'
                placeholder='Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button type='submit'>
                Register
            </button>
        </form>
    )

};

export default RegisterPage;

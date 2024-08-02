import { signInWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import { auth } from '../firebase';
import { Navigate, useNavigate } from 'react-router-dom';
import { FirebaseError } from 'firebase/app';
import { Link } from 'react-router-dom';
import { Wrapper, Form, Title, Input, Error, Switcher } from '../components/auth-components';


export default function Login() {
    const navigate = useNavigate();
    const [isLoading, setLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {target: {name, value}} = e;
        if(name === "email") {
            setEmail(value);
        } else if(name === "password") {
            setPassword(value);
        }
    };
    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");
        if(email === "" || password === "" || isLoading === true) {
            return;
        }
        try {
            setLoading(true);
            await signInWithEmailAndPassword(auth, email, password);
            navigate("/");
        } catch (err) {
            if(err instanceof FirebaseError){
                setError(err.message);
            }
        }
        finally{
            setLoading(false);
        }
        
    };

    return  (
    <Wrapper>
        <Title>Login</Title>
        <Form onSubmit={onSubmit}>
            <Input onChange={onChange} name="email" value={email} placeholder="Email" type="email" required/>
            <Input onChange={onChange} name="password" value={password} placeholder="Password" type="password" required/>
            <Input onChange={onChange} type="submit" value={isLoading ? "Loading..." : "Create Account"}/>
        </Form>
        {error !== ""? <Error>{error}</Error> : null}
        <Switcher>
            Don't have an account? {" "}
            <Link to="/create-account">Create Account</Link>
        </Switcher>
    </Wrapper>
    )
}
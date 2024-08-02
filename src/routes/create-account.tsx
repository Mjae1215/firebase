import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { useState } from 'react';
import { auth } from '../firebase';
import { Navigate, useNavigate } from 'react-router-dom';
import { FirebaseError } from 'firebase/app';
import { Link } from 'react-router-dom';
import { Wrapper, Form, Title, Input, Error, Switcher } from '../components/auth-components';

export default function CreateAccount() {
    const navigate = useNavigate();
    const [isLoading, setLoading] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {target: {name, value}} = e;
        if(name === "name") {
            setName(value);
        } else if(name === "email") {
            setEmail(value);
        } else if(name === "password") {
            setPassword(value);
        }
    };
    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");
        if(name === "" || email === "" || password === "" || isLoading === true) {
            return;
        }
        setLoading(true);
        try {
            setLoading(true);
            const credentials = await createUserWithEmailAndPassword(auth, email, password);
            console.log(credentials.user)
            await updateProfile(credentials.user, {displayName: name});
            console.log(name, email, password); 
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
        <Title>Create Account</Title>
        <Form onSubmit={onSubmit}>
            <Input onChange={onChange} name="name" value={name} placeholder="Name" type="text" required/>
            <Input onChange={onChange} name="email" value={email} placeholder="Email" type="email" required/>
            <Input onChange={onChange} name="password" value={password} placeholder="Password" type="password" required/>
            <Input onChange={onChange} type="submit" value={isLoading ? "Loading..." : "Create Account"}/>
        </Form>
        {error !== ""? <Error>{error}</Error> : null}
        <Switcher>
            Already have an account? {" "}
            <Link to="/login">Login</Link>
        </Switcher>
    </Wrapper>
    )
}
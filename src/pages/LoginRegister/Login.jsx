import React from 'react'
import { useState } from 'react';
import Navbar from '../../components/Navbar/Navbar'
import Styles from './LoginRegister.module.css'
import Button from '@mui/material/Button';

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [buttonText, setButtonText] = useState("Log in");

    const login = async (e) => {
        e.preventDefault();
        setButtonText("Logging in");
        try{
            const response = await fetch("https://localhost:7192/login?useCookies=true", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: email,
                    password: password
                }),
                credentials: 'include'
            });
            if(response.ok){
                window.location.href = '/';
            }
            else{
                setError("Email or Password not correct");
            }
        } catch(error) {
            setError("Network Error");
        } finally {
            setButtonText("Log in");
        }
    };
    return (
        <>
            <Navbar></Navbar>
            <div className={Styles.formSection}>
                <div className={Styles.form} id="form">
                    <div className={Styles.formHeader}>
                        <h1>Login</h1>
                    </div>
                    <div className={Styles.formFields}>

                        <form onSubmit={login}>
                            <div className={Styles.formRow}>
                                <div className={Styles.inputDiv} id="loginEmailDiv">
                                    <label>Email</label>
                                    <input
                                        id="loginEmail"
                                        name="email"
                                        type="email"
                                        placeholder="Enter Registered Email"
                                        required
                                        value={email} // Set the value to the current email state
                                        onChange={(event) => setEmail(event.target.value)}
                                    />
                                </div>
                                <div className={Styles.inputDiv} id="loginPasswordDiv">
                                    <label>Password</label>
                                    <input 
                                        id="loginPassword" 
                                        name="password" 
                                        type="password" 
                                        placeholder="Enter Your Password" 
                                        required
                                        value={password}
                                        onChange={(event) => setPassword(event.target.value)}
                                        />
                                </div>
                                

                            </div>
                            
                            <Button variant="contained" type='submit' disableElevation sx={{
                                marginTop: '20px', backgroundColor: '#28a08c', color: '#dcdcdc', width: '100%', fontSize: '1.4rem', '&:hover': {
                                    backgroundColor: '#19695b',
                                }
                            }}>{buttonText}</Button>
                            <p className={Styles.errorp}>{error}</p>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login

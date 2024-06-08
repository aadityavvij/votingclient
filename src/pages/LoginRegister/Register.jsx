import React from "react";
import { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Styles from "./LoginRegister.module.css";
import Button from "@mui/material/Button";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [buttonText, setButtonText] = useState("Register");

  const register = async (e) => {
    setButtonText("Registering");
    e.preventDefault();
    try {
      if (confirmPassword !== password) {
        setError("Passwords do not match");
      } else {
        const response = await fetch("https://localhost:7192/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: email,
            password: password,
          }),
          credentials: "include",
        });
        if (response.ok) {
          login();
        } else {
          setError("Email/password format not correct");
        }
      }
    } catch (e) {
      setError("Network Error");
    } finally {
      setButtonText("Register");
    }
  };

  const login = async () => {
    setButtonText("Logging in");
    try {
      const response = await fetch(
        "https://localhost:7192/login?useCookies=true",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: email,
            password: password,
          }),
          credentials: "include",
        },
      );
      if (response.ok) {
        window.location.href = "/";
      } else {
        setError("Some Error Occurred");
      }
    } catch (e) {
      setError("Network Error");
    } finally {
      setButtonText("Register");
    }
  };

  return (
    <>
      <Navbar></Navbar>
      <div className={Styles.formSection}>
        <div className={Styles.form} id="form">
          <div className={Styles.formHeader}>
            <h1>Register</h1>
          </div>
          <div className={Styles.formFields}>
            <form onSubmit={register}>
              <div className={Styles.formRow}>
                <div className={Styles.inputDiv} id="loginEmailDiv">
                  <label>Email</label>
                  <input
                    id="loginEmail"
                    name="email"
                    type="email"
                    placeholder="Enter Your Email"
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
                <div className={Styles.inputDiv} id="loginPasswordDiv">
                  <label>Confirm Password</label>
                  <input
                    id="loginPassword"
                    name="password"
                    type="password"
                    placeholder="Confirm Your Password"
                    required
                    value={confirmPassword}
                    onChange={(event) => setConfirmPassword(event.target.value)}
                  />
                </div>
              </div>

              <Button
                variant="contained"
                type="submit"
                disableElevation
                sx={{
                  marginTop: "20px",
                  backgroundColor: "#28a08c",
                  color: "#dcdcdc",
                  width: "100%",
                  fontSize: "1.4rem",
                  "&:hover": {
                    backgroundColor: "#19695b",
                  },
                }}
              >
                {buttonText}
              </Button>
              <p className={Styles.errorp}>{error}</p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;

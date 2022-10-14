import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { usernameSchema, passwordSchema, emailSchema } from "../utils/util";

import "./Registration.css";
import { register } from "../api";

export function Registration() {
  const navigate = useNavigate();
  const [user, setUser] = useState<{
    username: string;
    password: string;
    repeatPassword: string;
  }>({
    username: "",
    password: "",
    repeatPassword: "",
  });

  const [err, setErr] = useState<{
    login: boolean;
    username: boolean;
    password: boolean;
    repeatPassword: boolean;
  }>({
    login: false,
    username: false,
    password: false,
    repeatPassword: false,
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!user.username || !user.password || !user.repeatPassword) {
      return;
    }

    if (!(await register(user))) {
      setErr({ ...err, login: true });
      return;
    }

    navigate("/");
  }

  function handleRepeatPasswordChange(e: React.ChangeEvent<HTMLInputElement>) {
    setUser({ ...user, repeatPassword: e.target.value });
    console.log(user.password);
    console.log(user.repeatPassword);
    if (user.password !== e.target.value) {
      setErr({ ...err, repeatPassword: true });
    } else {
      setErr({ ...err, repeatPassword: false });
    }
  }

  function handleUnameChange(e: React.ChangeEvent<HTMLInputElement>) {
    setUser({ ...user, username: e.target.value });
    const unameMatchRes = usernameSchema.validate(e.target.value);
    if (unameMatchRes.error) {
      setErr({ ...err, username: true });
    } else {
      setErr({ ...err, username: false });
    }
  }

  function handlePwordChange(e: React.ChangeEvent<HTMLInputElement>) {
    setUser({ ...user, password: e.target.value });
    const pwordMatchRes = passwordSchema.validate(e.target.value);
    if (pwordMatchRes.error) {
      setErr({ ...err, password: true });
    } else {
      setErr({ ...err, password: false });
    }
  }

  return (
    <div className="Registration">
      <img
        className="WelcomePage__WelcomeImg"
        src="welcome.svg"
        alt="welcome"
      />
      <div className="WelcomePage__Title__Wrapper">
        <div className="WelcomePage__Title">ReCards</div>
      </div>
      <div className="Blank"></div>
      <div className="FormBlock">
        <div className="FormBlock__Wrapper">
          <div className="FormBlock__Title">Sign Up</div>

          <form className="RegisterForm" onSubmit={handleSubmit}>
            <div className="InputWrapper">
              <input
                type="text"
                className="FormInput"
                id="username"
                value={user.username}
                onChange={handleUnameChange}
                placeholder="Username"
              />
              {err.username && <p>Wrong Username</p>}
            </div>
            <div className="InputWrapper">
              <input
                type="password"
                className="FormInput"
                id="password"
                value={user.password}
                onChange={handlePwordChange}
                placeholder="Password"
              />
              {err.password && <p>Wrong Password</p>}
            </div>{" "}
            <div className="InputWrapper">
              <input
                type="password"
                className="FormInput"
                id="repeatPassword"
                value={user.repeatPassword}
                onChange={handleRepeatPasswordChange}
                placeholder="Repeat password"
              />
              {err.repeatPassword && <p>Passwords does not match</p>}
            </div>
            <input
              className="FormSubmit"
              type="submit"
              disabled={err.repeatPassword || err.username || err.password}
              value="Sign Up"
            />
          </form>

          <a
            className="RegisterRedirect"
            type="submit"
            onClick={() => navigate("/login")}
          >
            Already have an account?
          </a>
        </div>
      </div>
    </div>
  );
}

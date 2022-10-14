import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { usernameSchema, passwordSchema } from "../utils/util";
import { login } from "../api";
import "./Login.css";

export function Login() {
  const navigate = useNavigate();
  const [user, setUser] = useState<{ username: string; password: string }>({
    username: "",
    password: "",
  });

  const [err, setErr] = useState<{
    login: boolean;
    username: boolean;
    password: boolean;
  }>({
    login: false,
    username: false,
    password: false,
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!user.username || !user.password) {
      return;
    }

    if (!(await login(user))) {
      setErr({ ...err, login: true });
      return;
    }

    navigate("/");
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
    <div className="Login">
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
          <div className="FormBlock__Title">Sign In</div>
          <form className="LoginForm" onSubmit={handleSubmit}>
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
            </div>
            {err.login && <p>Invalid Credentials</p>}

            <input
              className="FormSubmit"
              type="submit"
              disabled={err.username || err.password}
              value="Sing In"
            />
          </form>
          <a
            className="RegisterRedirect"
            type="submit"
            onClick={() => navigate("/register")}
          >
            Don't have an account?
          </a>
        </div>
      </div>
    </div>
  );
}

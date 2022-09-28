import React, { useState } from "react"
import { useNavigate } from "react-router-dom";

import { usernameSchema, passwordSchema } from "../config/utils/util";
import { login } from "../api";


export function Login() {
    const navigate = useNavigate();
    const [user, setUser] = useState<{ username: string; password: string }>({
        username: '',
        password: '',
    });

    const [err, setErr] = useState<{ login: boolean; username: boolean; password: boolean }>({
        login: false,
        username: false,
        password: false,
    });

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (!user.username || !user.password) {
            return
        }

        if (!await login(user)) {
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
        <form className="loginform" onSubmit={handleSubmit}>
            <h5>Login</h5>
            <div className="formrow">
                <label htmlFor="username" className="formlabel">
                    username
                </label>
                <input
                    type="text"
                    className="forminput"
                    id="username"
                    value={user.username}
                    onChange={handleUnameChange}
                />
                {err.username && <p>Wrong Username</p>}
            </div>
            <div className="formrow">
                <label htmlFor="password" className="formlabel">
                    password
                </label>
                <input
                    type="text"
                    className="forminput"
                    id="password"
                    value={user.password}
                    onChange={handlePwordChange}
                />
                {err.password && <p>Wrong Password</p>}
            </div>
            {err.login && <p>Invalid Credentials</p>}
            <div className="buttoncontainer">
                <button className="submitbutton" type="submit" disabled={err.username || err.password}>Submit</button>
                <button className="submitbutton" type="submit" onClick={() => navigate("/register")}>Register</button>
            </div>
        </form>
    )
}


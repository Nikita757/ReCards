import React, { useState } from "react"
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { API_URL } from "../config/config";
import { usernameSchema, passwordSchema } from "../config/utils/util";


export function Login() {
    const navigate = useNavigate();
    const [user, setUser] = useState<{ username: string; password: string }>({
        username: '',
        password: '',
    });

    const [err, setErr] = useState<{ username: boolean; password: boolean }>({
        username: false,
        password: false,
    });

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (!user.username || !user.password) {
            return
        }

        try {
            const res = await axios.post(
                `${API_URL}/login`, user, {
                headers: {
                    "Content-Type": "application/json",
                }
            });

            if (res.status === 200) {
                navigate("/");
            }
        } catch (error) {
            console.log("NET");
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
            <div className="buttoncontainer">
                <button className="submitbutton" type="submit">Submit</button>
                <button className="submitbutton" type="submit" onClick={() => navigate("/register")}>Register</button>
            </div>
        </form>
    )
}


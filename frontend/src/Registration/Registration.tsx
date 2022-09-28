import React, { useState } from "react"
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { API_URL } from "../config/config";
import { usernameSchema, passwordSchema, emailSchema } from "../config/utils/util";

import "./Registration.css"

export function Registration() {
    const navigate = useNavigate();
    const [user, setUser] = useState<{ email: string, username: string; password: string }>({
        email: '',
        username: '',
        password: '',
    });

    const [err, setErr] = useState<{ email: boolean; username: boolean; password: boolean }>({
        email: false,
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
                `${API_URL}/register`, user, {
                headers: {
                    "Content-Type": "application/json",
                }
            });

            if (res.status === 200) {
                navigate("/");
            }
        } catch (err) {
            console.log("NET");
        }
    }

    function handleEmailChange(e: React.ChangeEvent<HTMLInputElement>) {
        setUser({ ...user, email: e.target.value });
        const emailMatchRes = emailSchema.validate(e.target.value);
        if (emailMatchRes.error) {
            setErr({ ...err, email: true });
        } else {
            setErr({ ...err, email: false });
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
        <form className="registerform" onSubmit={handleSubmit}>
            <h5>Register</h5>
            <div className="formrow">
                <label htmlFor="email" className="formlabel">
                    email
                </label>
                <input
                    type="text"
                    className="forminput"
                    id="email"
                    value={user.email}
                    onChange={handleEmailChange}
                />
                {err.email && <p>Wrong Email</p>}
            </div>
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
                <button className="submitbutton" type="submit" onClick={() => navigate("/login")}>Login</button>
            </div>
        </form>
    )
}

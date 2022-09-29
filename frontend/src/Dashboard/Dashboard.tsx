import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../config/config";

export function Dashboard() {
    const navigate = useNavigate();
    async function handleLogout(e: React.FormEvent) {
        e.preventDefault();

        try {
            const res = await axios.post(`${API_URL}/logout`, {});
            if (res.status === 200) {
                navigate("/login");
            }
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        async function dash() {
            try {
                const res = await axios.get(`${API_URL}/dashboard`, { withCredentials: true });
                if (res.status === 200) {
                    console.log(res);
                }
            } catch (err) {
                console.log(err);
                navigate("/login");
            }
        }

        dash();
    }, [])

    return (
        <>
            <h2>Dashboard</h2>
            <form onSubmit={handleLogout}></form>
        </>
    )
}

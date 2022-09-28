import axios from "axios";

import { API_URL } from "../config/config";

export async function login(user: { username: string, password: string }): Promise<boolean> {
    try {
        await axios.post(
            `${API_URL}/login`, user, {
            headers: {
                "Content-Type": "application/json",
                "Credentials": true
            }
        });
    } catch (err) {
        console.log(err);
        return false;
    }

    return true;
}

export async function register(user: { email: string, username: string, password: string }): Promise<boolean> {
    try {
        await axios.post(
            `${API_URL}/register`, user, {
            headers: {
                "Content-Type": "application/json",
                "Credentials": true
            }
        });
    } catch (err) {
        console.log(err);
        return false;
    }

    return true
}

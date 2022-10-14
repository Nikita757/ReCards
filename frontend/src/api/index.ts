import axios from "axios";

import { API_URL } from "../config/config";
import { Deck } from "../utils/types";

export async function login(user: { username: string, password: string }): Promise<boolean> {
    try {
        await axios.post(
            `${API_URL}/login`, user, { withCredentials: true });
    } catch (err) {
        console.log(err);
        return false;
    }

    return true;
}

export async function register(user: { email: string, username: string, password: string }): Promise<boolean> {
    try {
        await axios.post(
            `${API_URL}/register`, user, { withCredentials: true });
    } catch (err) {
        console.log(err);
        return false;
    }

    return true
}

export async function logout(): Promise<boolean> {
    try {
        const res = await axios.post(`${API_URL}/logout`, {}, { withCredentials: true });
        if (res.status === 200) {
            return true
        }
    } catch (err) {
        console.log(err);
    }

    return false;
}

export async function postDeck(deckName: string): Promise<boolean> {
    try {
        await axios.post(
            `${API_URL}/deck`, { name: deckName }, { withCredentials: true }
        )

        return true;
    } catch (err) {
        console.log(err);
        return false;
    }
}

export async function getAllDecks(): Promise<Array<Deck>> {
    try {
        const res = await axios.get(
            `${API_URL}/deck`, { withCredentials: true }
        )

        return res.data;
    } catch (err) {
        console.log(err);
        throw (err);
    }
}

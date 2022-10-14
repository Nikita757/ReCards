import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Deck, RenderDecksProps } from "../utils/types";
import { getAllDecks, logout } from "../api";
import { API_URL } from "../config/config";

import "./Dashboard.css"

export function Dashboard() {
    const [modalIsOpen, setIsOpen] = useState(false);
    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }

    const navigate = useNavigate();
    async function handleLogout(e: React.FormEvent) {
        e.preventDefault();

        if (await logout()) {
            navigate("/login")
        }
    }

    let data: Array<Deck> = [];
    useEffect(() => {
        async function makeRequest() {
            try {
                data = await getAllDecks();
            } catch (err) {
                navigate("/login");
            }
        }

        makeRequest();
    }, []);

    return (
        <>
            <div className="Title">
                Your Decks
            </div>
            <div className="Decks">
                <RenderDecks decks={data} />
            </div>
            <button onClick={openModal}>Add Deck</button>
            <form action="">
                <input type="text" name="deckName" />
                <input type="submit" value="Submit" />
            </form>
            <form onSubmit={handleLogout}>
                <button className="submitbutton" type="submit">Logout</button>
            </form>
        </>
    )
}

function RenderDecks({ decks }: RenderDecksProps) {
    const navigate = useNavigate();

    if (decks.length === 0) {
        return (
            <div>
                No Decks Yet!
            </div>
        )
    }

    return (
        <>
            {decks.map((deck) => {
                return (
                    <div key={deck.deck_id} className="Deck" onClick={() => navigate(`/deck/${deck.deck_id}`)}>{deck.name}</div>
                )
            })}
        </>
    )
}

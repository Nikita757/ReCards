import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../config/config";
import Modal from "react-modal";

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

        try {
            const res = await axios.post(`${API_URL}/logout`, {}, { withCredentials: true });
            if (res.status === 200) {
                navigate("/welcome");
            }
        } catch (err) {
            console.log(err);
        }
    }

    // useEffect(() => {
    //     async function dash() {
    //         try {
    //             const res = await axios.get(`${API_URL}/dashboard`, { withCredentials: true });
    //             if (res.status === 200) {
    //                 console.log(res);
    //             }
    //         } catch (err) {
    //             console.log(err);
    //             navigate("/login");
    //         }
    //     }

    //     dash();
    // }, []);

    const data: Array<Deck> = [
        {
            deck_id: 1,
            name: "deck1",
            creator: "abeba"
        },
        {
            deck_id: 2,
            name: "deck2",
            creator: "abeba"
        },
        {
            deck_id: 3,
            name: "deck3",
            creator: "abeba"
        }
    ]

    return (
        <>
            <h2>Dashboard</h2>
            <RenderDecks decks={data} />
            <button onClick={openModal}>Open Modal</button>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Example Modal"
            >
                <form action="">
                    <input type="text" name="deckName" />
                    <input type="submit" value="Submit" />
                </form>
            </Modal>
            <button onClick={closeModal}>close</button>
            <form onSubmit={handleLogout}>
                <button className="submitbutton" type="submit">Logout</button>
            </form>
        </>
    )
}

type Deck = {
    deck_id: number;
    name: string;
    creator: string;
}

type RenderDecksProps = {
    decks: Deck[]
}

function RenderDecks({ decks }: RenderDecksProps) {
    const navigate = useNavigate();

    return (
        <>
            {decks.map((deck) => {
                return (
                    <div key={deck.deck_id} className="deck" onClick={() => navigate(`/deck/${deck.deck_id}`)}>{deck.name}</div>
                )
            })}
        </>
    )
}

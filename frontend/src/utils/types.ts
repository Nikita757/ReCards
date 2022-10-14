export type Deck = {
    deck_id: number;
    name: string;
    creator: string;
}

export type RenderDecksProps = {
    decks: Deck[]
}

import { cards, fx } from "./luthiers";
import { arrRand } from "../utils";
import { Player } from "../Player";

export enum cardType {
  "Instrument",
  "Luthier",
  "Song",
  "Effect",
  "Trivia"
}

export type cardAttr = Omit<Card, "getInfo" | "hasTag">;

export class Card {
  id: number;
  type: cardType;
  name: string;
  slug: string;
  text: string;
  claps: number;
  tags: string[];
  cards?: number[];

  constructor({ id, type, name, slug, text, claps, cards, tags }: cardAttr) {
    this.id = id;
    this.type = type;
    this.claps = claps;
    this.name = name;
    this.slug = slug;
    this.text = text;
    this.cards = cards;
    this.tags = tags;
  }

  /**
   * Debug info for a card
   *
   * @returns string
   */
  getInfo(): string {
    return `${this.id}: ${this.name} - ${this.tags} - ${this.claps}`;
  }

  /**
   *
   * @param tag Check if the card has a tag
   * @returns boolean
   */
  hasTag(tag: string): boolean {
    return this.tags.indexOf(tag) >= 0;
  }

  /**
   * Finds a card from the deck by its id
   *
   * @param id
   * @returns Card | undefined
   */
  static getCard(id: number): Card | undefined {
    const card = cards.find((card: cardAttr) => id == card.id);
    return card ? new Card(card) : card;
  }

  /**
   * Gets ratio of cards
   */
  static getRatio(cards: Card[]) {
    const stack = { "0": 0, "1": 0, "2": 0 };

    cards.forEach((card: Card) => {
      if (stack[card.type]) {
        stack[card.type] += 1 / cards.length;
      } else {
        stack[card.type] = 1 / cards.length;
      }
    });

    return stack;
  }

  /**
   * Find a random card from the deck
   *
   * @returns Card
   */
  static getRandomCard(currentPlayer: Player, players: Player[]): Card {
    let card: cardAttr;

    // 30% chance of an effect/trivia card
    if (Math.random() * 100 < 30) {
      card = arrRand(fx) as cardAttr;
      console.log("Card: getting fx/trivia", card);

      // Check if fx is applicable
      let isOk = true;

      if (card.type === cardType.Effect && card.tags[0] !== "") {
        isOk = false;

        players.forEach((player: Player) => {
          player.cards.forEach((ccard: Card) => {
            console.log(`Card: Checking if "${card.tags[0]}" applicable to "${ccard.tags}"`);

            if (ccard.hasTag(card.tags[0])) {
              isOk = true;
            }
          });
        });
      }

      if (isOk) {
        return new Card(card);
      }
    }

    card = arrRand(cards) as cardAttr;
    console.log("Card: getting regular card", card);
    console.log("Card: ratio", Card.getRatio(currentPlayer.cards));
    //let cards: Card[] = [];
    //players.forEach((player: Player) => cards = [...player.cards]);

    return new Card(card);
  }

  /**
   * Validates a set of cards
   *
   * @param playerCardSet Card[]
   * @returns number representing the claps this set is worth of
   */
  static getValidSong(playerCardSet: Card[]): number {
    // Get the first song in the set, if any, find its cards
    const songCard = playerCardSet.find((card: Card) => card.type === cardType.Song);
    const songCardList = songCard?.cards || [];
    console.log("getValidSong", { playerCardSet, songCard, songCardList });
    let claps = songCard?.claps || 0;
    let totalCards = songCardList.length;

    // Validate each of the cards of the song
    songCardList.forEach((id: number) => {
      console.log("card_id", id);
      const find = playerCardSet.find((playerCard: Card) => {
        console.log("Compare", { id, playerCard: playerCard.id });
        return playerCard.id == id;
      });
      console.log("Finding", { id, find });

      if (find !== undefined) {
        console.log("Found", Card.getCard(find.id));
        claps += find.claps;
        totalCards--;
      } else {
        claps = 0;
        return;
      }
    });

    if (totalCards != 0) claps = 0;
    return claps;
  }
}



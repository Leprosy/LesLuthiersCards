import { cards } from "./cards/luthiers";
import { arrRand } from "./utils";

export enum cardType {
  "Instrument",
  "Luthier",
  "Song",
  "Effect"
}

export type cardAttr = Omit<Card, "getInfo">;

export class Card {
  id: number;
  type: cardType;
  name: string;
  slug: string;
  text: string;
  claps: number;
  cards?: number[];

  constructor({ id, type, name, slug, text, claps, cards }: cardAttr) {
    this.id = id;
    this.type = type;
    this.claps = claps;
    this.name = name;
    this.slug = slug;
    this.text = text;
    this.cards = cards;
  }

  /**
   * Debug info for a card
   *
   * @returns string
   */
  getInfo(): string {
    return `${this.id}: ${this.name} - ${this.text}`;
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
   * Find a random card from the deck
   *
   * @returns Card
   */
  static getRandomCard(): Card {
    const card = arrRand(cards) as cardAttr;
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
    let claps = 0;
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



import { cards, fx, trivia } from "./luthiers";
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

  static playedTriviaIds: number[] = [];

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
   * Find a random card from the deck using a simple algorithm of chance
   * One fx(30%) or Three regulars(70%)
   *
   * @returns Card
   */
  static getRandomCards(currentPlayer: Player, players: Player[]): Card[] {
    // 30% chance of getting an effect/trivia card
    if (Math.random() * 100 < 30) {
      let card: cardAttr;
      card = arrRand(fx) as cardAttr;
      console.log("Card: getting fx/trivia", card);

      let isOk = true;

      // If FX, check if it is applicable
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

      // If Trivia, check if it wasn't played already
      if (card.type === cardType.Trivia) {
        console.log("Card: Trivias played", Card.playedTriviaIds);

        if (Card.playedTriviaIds.length == trivia.length) {
          // All trivias played
          console.log("Card: All trivias played, shuffling.");
          Card.playedTriviaIds = [];
        }

        while (Card.playedTriviaIds.indexOf(card.id) > 0) {
          console.log("Card: trivia already played", card);
          card = arrRand(trivia) as cardAttr;
        }

        Card.playedTriviaIds.push(card.id);

      }

      if (isOk) {
        return [new Card(card)];
      }
    }

    // 70% of getting Luthier/Song/Instrument
    // You can't get a Luthier/Instrument you already have
    const card3: Card[] = [];
    let card: cardAttr;
    let isOk = false;

    const ids = currentPlayer.cards
      .filter((card: Card) => card.type !== cardType.Song)
      .map((card: Card) => card.id);

    while (card3.length < 3) { // TODO: Rules can change this value?
      do {
        card = arrRand(cards) as cardAttr;
        console.log("Card: Regular card being checked", card);

        if (ids.indexOf(card.id) < 0) {
          console.log("Card: Regular card not in hand or is a song.");
          isOk = true;
        }
      } while (!isOk);

      card3.push(new Card(card));
      ids.push(card.id);
      isOk = false;
    }

    console.log("Card: getting regular card set", card3);
    return card3;
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



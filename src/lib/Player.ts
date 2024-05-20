import { Card } from "./Card/Card";
import { arrRand } from "./utils";

export class Player {
  public cards: Card[];
  public claps: number;
  public name: string;

  static names = [
    "Condesa Shortshot", "Wilferico", "Creolina", "Pepe", "Sali Baba", "Henriette",
    "Lulu", "Cesar Augusto", "Leprosy", "Celestino", "Paradise", "Felisa", "Abelardo",
    "Sofía", "Johann Sebastian", "Duquesa de Lowbridge", "María", "Escipión", "Carlos Alberto",
    "Agatha Clearence", "Esther", "Alicia", "Jose Luis", "Angustias", "Dolores", "Rodrigo Díaz",
    "Daniel", "Helmut", "Antenor Vituperio", "Rosarito", "Clarita", "Clara de Luna", "Mariana",
    "Euterpe", "Eurípides", "Platón", "Terpsícore", "Thalía", "Arquímedes", "Thales", "King Balompie",
    "Papa Garland", "Bob Gordon", "Lilly Higgins", "Pepper Clemens", "Sor Bety", "Gúndula", "Sergei Dimitri"];

  constructor() {
    this.cards = [];
    this.claps = 0;
    this.name = arrRand(Player.names) as string;
  }
}
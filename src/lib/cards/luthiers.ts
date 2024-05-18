import { cardAttr, cardType } from "../Card";



const luthiers: cardAttr[] = [
  {
    id: 0,
    type: cardType.Luthier,
    name: "Marcos Mundstock",
    slug: "Marcos",
    text: "Marcos Mundstock Finkelstein. Actor, locutor, creativo publicitario. Humorista. Futbolista aficionado.",
    claps: 4
  },
  {
    id: 1,
    type: cardType.Luthier,
    name: "Carlitos Nuñez Cortés",
    slug: "Carlitos",
    text: "Concertista de piano. Compositor y arreglador. Varias veces premiado por partituras para obras de teatro.",
    claps: 4
  },
  {
    id: 2,
    type: cardType.Luthier,
    name: "Jorge Maronna",
    slug: "Jorge",
    text: "Guitarra",
    claps: 4
  },
  {
    id: 3,
    type: cardType.Luthier,
    name: "Daniel Rabinovich",
    slug: "Neneco",
    text: "Payaso",
    claps: 4
  },
  {
    id: 4,
    type: cardType.Luthier,
    name: "Carlos Lopez Puccio",
    slug: "Puccio",
    text: "Canoso",
    claps: 4
  }
];



const instruments: cardAttr[] = [
  {
    id: 10,
    type: cardType.Instrument,
    name: "Bass Pipe a Vara",
    slug: "Bass Pipe",
    text: "Para que sus notas vibren, cuenta con escape libre.",
    claps: 4
  },
  {
    id: 11,
    type: cardType.Instrument,
    name: "Latín",
    slug: "Latín",
    text: "Stradivarius lo emplea para envasar obleas.",
    claps: 4
  },
  {
    id: 12,
    type: cardType.Instrument,
    name: "Piano",
    slug: "Piano",
    text: "Instrumento musical de cuerdas metálicas dispuestas dentro de una caja de resonancia, que son golpeadas por macillos accionados desde un teclado",
    claps: 4
  },
  {
    id: 13,
    type: cardType.Instrument,
    name: "Tubófono parafínico cromático",
    slug: "Tubófono",
    text: "Con su dilema infinito, to be or not tubito.",
    claps: 4
  },
  {
    id: 14,
    type: cardType.Instrument,
    name: "Cellato",
    slug: "Cellato",
    text: "En el cuarteto de cuerdas luthierano es el instrumento que parodia al violoncello",
    claps: 4
  }
];



const songs: cardAttr[] = [
  {
    id: 100,
    type: cardType.Song,
    name: "Concierto de Mpkstroff",
    slug: "Mpkstroff",
    text: "El presente recital de Les Luthiers continúa con el Concierto para piano y orquesta, opus 57, en re menor... en re mayor... en re menor, mayormente, del compositor eslavo Sergei Dimitri... Mm... mm... mm...Mpkstroff.",
    claps: 30,
    cards: [1, 12]
  },
  {
    id: 101,
    type: cardType.Song,
    name: "Teorema de Thales",
    slug: "Thales",
    text: "Johann Sebastian Mastropiero dedicó su divertimento matemático, op. 48, el Teorema de Thales, a la condesa Shortshot",
    claps: 15,
    cards: [2, 4, 13, 14]
  },
  {
    id: 102,
    type: cardType.Song,
    name: "La bella y graciosa moza marchose a lavar la ropa",
    slug: "La moza",
    text: "Les Luthiers continúan su recital de esta noche interpretando, de Johann Sebastian Mastropiero, ... bueno, La bella y graciosa moza... bla bla bla... la colgó de un abedul",
    claps: 10,
    cards: [0, 11]
  },
  {
    id: 103,
    type: cardType.Song,
    name: "Recitado Gauchezco",
    slug: "Recitado",
    text: "...que te parió",
    claps: 5,
    cards: [0, 3]
  },
  {
    id: 104,
    type: cardType.Song,
    name: "Solo Necesitamos",
    slug: "Solo Necesitamos",
    text: "Hippie",
    claps: 5,
    cards: [2, 4]
  },
  {
    id: 105,
    type: cardType.Song,
    name: "Poemas de Gemini",
    slug: "Poemas Gemini",
    text: "1490",
    claps: 5,
    cards: [3]
  },

];

export const cards: cardAttr[] = [...luthiers, ...instruments, ...songs];

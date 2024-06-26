import { cardAttr, cardType } from "./Card";

const luthiers: cardAttr[] = [
  {
    id: 0,
    type: cardType.Luthier,
    name: "Marcos Mundstock",
    slug: "Marcos",
    text: "Marcos Mundstock Finkelstein. Actor, locutor, creativo publicitario. Humorista. Futbolista aficionado.",
    claps: 4,
    tags: ["marcos"]
  },
  {
    id: 1,
    type: cardType.Luthier,
    name: "Carlitos Nuñez Cortés",
    slug: "Carlitos",
    text: "Concertista de piano. Compositor y arreglador. Varias veces premiado por partituras para obras de teatro.",
    claps: 4
    ,
    tags: ["carlitos"]
  },
  {
    id: 2,
    type: cardType.Luthier,
    name: "Jorge Maronna",
    slug: "Jorge",
    text: "Guitarra",
    claps: 4
    , tags: ["jorge"]
  },
  {
    id: 3,
    type: cardType.Luthier,
    name: "Daniel Rabinovich",
    slug: "Neneco",
    text: "Payaso",
    claps: 4
    , tags: ["neneco"]
  },
  {
    id: 4,
    type: cardType.Luthier,
    name: "Carlos Lopez Puccio",
    slug: "Puccio",
    text: "Canoso",
    claps: 4,
    tags: ["puccio"]
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
    , tags: ["viento"]
  },
  {
    id: 11,
    type: cardType.Instrument,
    name: "Latín",
    slug: "Latín",
    text: "Stradivarius lo emplea para envasar obleas.",
    claps: 4
    , tags: ["cuerda"]
  },
  {
    id: 12,
    type: cardType.Instrument,
    name: "Piano",
    slug: "Piano",
    text: "Instrumento musical de cuerdas metálicas dispuestas dentro de una caja de resonancia, que son golpeadas por macillos accionados desde un teclado",
    claps: 4
    , tags: ["piano"]
  },
  {
    id: 13,
    type: cardType.Instrument,
    name: "Tubófono parafínico cromático",
    slug: "Tubófono",
    text: "Con su dilema infinito, to be or not tubito.",
    claps: 4
    , tags: ["viento"]
  },
  {
    id: 14,
    type: cardType.Instrument,
    name: "Cellato",
    slug: "Cellato",
    text: "En el cuarteto de cuerdas luthierano es el instrumento que parodia al violoncello",
    claps: 4
    , tags: ["cuerda"]
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
    , tags: []
  },
  {
    id: 101,
    type: cardType.Song,
    name: "Teorema de Thales",
    slug: "Thales",
    text: "Johann Sebastian Mastropiero dedicó su divertimento matemático, op. 48, el Teorema de Thales, a la condesa Shortshot",
    claps: 15,
    cards: [2, 4, 13, 14]
    , tags: []
  },
  {
    id: 102,
    type: cardType.Song,
    name: "La bella y graciosa moza marchose a lavar la ropa",
    slug: "La moza",
    text: "Les Luthiers continúan su recital de esta noche interpretando, de Johann Sebastian Mastropiero, ... bueno, La bella y graciosa moza... bla bla bla... la colgó de un abedul",
    claps: 10,
    cards: [0, 11]
    , tags: []
  },
  {
    id: 103,
    type: cardType.Song,
    name: "Recitado Gauchezco",
    slug: "Recitado",
    text: "...que te parió",
    claps: 5,
    cards: [0, 3]
    , tags: []
  },
  {
    id: 104,
    type: cardType.Song,
    name: "Solo Necesitamos",
    slug: "Solo Necesitamos",
    text: "Hippie",
    claps: 5,
    cards: [2, 4]
    , tags: []
  },
  {
    id: 105,
    type: cardType.Song,
    name: "Poemas de Gemini",
    slug: "Poemas Gemini",
    text: "1490",
    claps: 5,
    cards: [3]
    , tags: []
  },

];

// tags: [tag-affected, all|own|other, claps-added]
// if claps < 0, card removed
const effects: cardAttr[] = [
  {
    id: 200,
    type: cardType.Effect,
    name: "Temperatura alta en el teatro",
    slug: "Temperatura alta",
    text: "¡Todos los instrumentos de cuerda se han desafinado!",
    claps: 0,
    cards: [],
    tags: ["cuerda", "all", "-100"]
  },
  {
    id: 201,
    type: cardType.Effect,
    name: "Pánico Escénico",
    slug: "Pánico",
    text: "¡Marcos ha sufrido pánico escénico! Todos los Marcos huyen despavoridos... :(",
    claps: 0,
    cards: [],
    tags: ["marcos", "all", "-1000"]
  },
  {
    id: 202,
    type: cardType.Effect,
    name: "Sabotaje",
    slug: "Sabotaje",
    text: "¡Has sabotado los pianos de tus rivales muajajaja!",
    claps: 0,
    cards: [],
    tags: ["piano", "other", "-1000"]
  },
  {
    id: 203,
    type: cardType.Effect,
    name: "Hepatitis",
    slug: "Hepatitis",
    text: "¡Puccio ha contraído hepatitis! Todos tus Puccios deben ir a reposar... :(",
    claps: 0,
    cards: [],
    tags: ["puccio", "own", "-1000"]
  },
  {
    id: 204,
    type: cardType.Effect,
    name: "Improvisación Perfecta",
    slug: "Improvisación",
    text: "Marcos y Daniel se han salido de libreto, razonaron por caminos sinuosos, reflexionaron fuera del recipiente y al público le encantó. ¡Te has ganado 50 aplausos!",
    claps: 0,
    cards: [],
    tags: ["", "own", "50"]
  },
  {
    id: 205,
    type: cardType.Effect,
    name: "Amnesia Repentina",
    slug: "Amnesia",
    text: "Alguien ha olvidado el texto. Qué podemos decir...qué podemos decir...QUÉ PODEMOS DECIR. ¡Has perdido 50 aplausos!",
    claps: 0,
    cards: [],
    tags: ["", "own", "-50"]
  },
];

export const trivia: cardAttr[] = [
  {
    id: 301,
    type: cardType.Trivia,
    name: "",
    slug: "",
    text: "¿En qué año Ernesto Acher se retiró de Les Luthiers?",
    claps: 11,
    cards: [],
    tags: ["1986", "1989", "1988", "1991"]
  },
  {
    id: 302,
    type: cardType.Trivia,
    name: "",
    slug: "",
    text: "¿En qué año se funda Les Luthiers?",
    claps: 20,
    cards: [],
    tags: ["1967", "1977", "1987", "1997"]
  },
  {
    id: 303,
    type: cardType.Trivia,
    name: "",
    slug: "",
    text: "¿Cómo se llama el primer espectáculo de la versión quinteto?",
    claps: 5,
    cards: [],
    tags: ["Viegésimo Aniversario", "Grandes Hitos", "El reír de los Cantares", "Unen Canto con Humor"]
  },
  {
    id: 304,
    type: cardType.Trivia,
    name: "",
    slug: "",
    text: "¿Cómo se llamó la primera obra monovocálica de Les Luthiers?",
    claps: 15,
    cards: [],
    tags: ["Miss Lilly Higgins", "Papa Garland", "Pepper Clemens", "Tía Ruperta"]
  },
  {
    id: 305,
    type: cardType.Trivia,
    name: "",
    slug: "",
    text: "¿Cuál es el nombre del actor que hace de oculista en la teleserie Alma de Corazón?",
    claps: 20,
    cards: [],
    tags: ["Juan Peñalba", "Isaías Contreras", "Nacho Gutierrez", "Francisco Poletti"]
  },
  {
    id: 306,
    type: cardType.Trivia,
    name: "",
    slug: "",
    text: "¿Qué instrumento representa al Pajarillo Amarillo en Teresa y el Oso?",
    claps: 30,
    cards: [],
    tags: ["Tubófono Silicónico", "Tubófono Parafínico", "Tubófono Natural", "Tubófono da Testa"]
  },
  {
    id: 307,
    type: cardType.Trivia,
    name: "",
    slug: "",
    text: "¿Cuál de estos no es un seudónimo de Mastropiero?",
    claps: 20,
    cards: [],
    tags: ["Raymond Drinkstein", "Johann Severo Mastropiano", "Klaus Müller", "Peter Illich"]
  },
  {
    id: 308,
    type: cardType.Trivia,
    name: "",
    slug: "",
    text: "¿En qué espectáculo se estrena el Gom-Horn a Pistones?",
    claps: 30,
    cards: [],
    tags: ["Recital 73", "Recital 74", "Blancanieves y los 7 Pecados Capitales", "Mastropiero que Nunca"]
  },
  {
    id: 309,
    type: cardType.Trivia,
    name: "",
    slug: "",
    text: "¿Cuál de estos instrumentos de viento nunca apareció en un espectáculo?",
    claps: 30,
    cards: [],
    tags: ["Flauta Traversa", "Flauta Dulce", "Quena", "Pincuyo"]
  },
  {
    id: 310,
    type: cardType.Trivia,
    name: "",
    slug: "",
    text: "¿Qué instrumento fue estrenado en Humor Dulce Hogar?",
    claps: 12,
    cards: [],
    tags: ["Mandocleta", "Mangelódica", "Tamburete", "Matraca"]
  },
  {
    id: 311,
    type: cardType.Trivia,
    name: "",
    slug: "",
    text: "¿En qué espectáculo se estrenan las Tablas de Lavar?",
    claps: 12,
    cards: [],
    tags: ["Por Humor al Arte", "Humor Dulce Hogar", "Luthierías", "Hacen Muchas Gracias de Nada"]
  },
  {
    id: 312,
    type: cardType.Trivia,
    name: "",
    slug: "",
    text: "¿Cuál es la primera nota del Teorema de Thales?",
    claps: 20,
    cards: [],
    tags: ["Fa", "Fa Sostenido", "Re", "Sol"]
  },
  {
    id: 313,
    type: cardType.Trivia,
    name: "",
    slug: "",
    text: "¿Qué instrumento jamás fue ejecutado por Marcos Mundstock?",
    claps: 18,
    cards: [],
    tags: ["Kazoo", "Kultrún", "Gom-Horn Natural", "Teclado"]
  },
  {
    id: 314,
    type: cardType.Trivia,
    name: "",
    slug: "",
    text: "¿Qué instrumento jamás fue ejecutado por Daniel Rabinovich?",
    claps: 18,
    cards: [],
    tags: ["Chelato", "Piano", "Flauta", "Guitarra Dulce"]
  },
  {
    id: 315,
    type: cardType.Trivia,
    name: "",
    slug: "",
    text: "¿Cuál de estos instrumentos ha sido tocado por Marcos Mundstock?",
    claps: 10,
    cards: [],
    tags: ["Compadescu", "Piano", "Flauta", "Guitarra Dulce"]
  },
  {
    id: 316,
    type: cardType.Trivia,
    name: "",
    slug: "",
    text: "¿Cuál de estos instrumentos ha sido tocado por Jorge Marona?",
    claps: 10,
    cards: [],
    tags: ["Clamaneus", "Glamocot", "Glisofono", "Gom Horn"]
  },
  {
    id: 317,
    type: cardType.Trivia,
    name: "",
    slug: "",
    text: "¿En qué espectáculo se interpretó la obra mariposa Mi Amada es una Máquina?",
    claps: 15,
    cards: [],
    tags: ["Viegésimo Aniversario", "Viejos Fracasos", "Viejos Hazmereíres", "Unen Canto con Humor"]
  },
];


export const cards: cardAttr[] = [...luthiers, ...instruments, ...songs];
export const fx: cardAttr[] = [...effects, ...trivia];

export interface CardInterface {
  id: number;
  img: string;
  flipped: boolean;
}

export const card = [
  {
    id: 0,
    img: "./../../assets/bastos1.jpg",
    flipped: false
  },

  {
    id: 1,
    img: "./../../assets/bastos12.jpg",
    flipped: false
  },
  {
    id: 2,
    img: "./../../assets/copas1.jpg",
    flipped: false
  },
  {
    id: 3,
    img: "./../../assets/copas12.jpg",
    flipped: false
  },
  {
    id: 4,
    img: "./../../assets/espadas1.jpg",
    flipped: false
  },
  {
    id: 5,
    img: "./../../assets/espadas12.jpg",
    flipped: false
  },
  {
    id: 6,
    img: "./../../assets/oros1.jpg",
    flipped: false
  },
  {
    id: 7,
    img: "./../../assets/oros12.jpg",
    flipped: false
  },
];

export class Card implements CardInterface {
  id: number;
  img: string;
  flipped: boolean;

  constructor(id: number, img: string, flipped: boolean,) {
    this.flipped = flipped;
    this.id = id;
    this.img = img;
  }

  static getPairedCards(): Array<Card> {
    let numCards = parseInt(<string>localStorage.getItem("numImages"));
    let res: Array<Card> = [];

    for (let i = 0; i < numCards / 2; i++) {
      let cardOne = new Card(Math.round(Math.random() * 100), card[i % 8].img, false);
      let cardTwo = new Card(Math.round(Math.random() * 100), card[i % 8].img, false);
      res.push(cardOne);
      res.push(cardTwo);
    }

    return res;
  }

  static shuffle(): Array<Card> {
    let array = this.getPairedCards();
    //Generate random ID for each card
    for (let i = 0; i < array.length; i++) {
      array[i].id = Math.round(Math.random() * 1000);
    }

    //Get playingCards in random positions
    let currentIndex = array.length,
      randomIndex;

    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
  }

  public getId(): number {
    return this.id;
  }

  public setId(value: number) {
    this.id = value;
  }

  public getImg(): string {
    return this.img;
  }

  public setImg(value: string) {
    this.img = value;
  }

  public getFlipped(): boolean {
    return this.flipped;
  }

  public setFlipped(value: boolean) {
    this.flipped = value;
  }

}







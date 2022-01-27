import {Card} from "./card";

export interface GameInterface {
  playingCards: Card[],
  winnerCards: Card[],
  timeLeft: number,
  score: number
}

export class Game implements GameInterface {
  playingCards: Card[];
  winnerCards: Card[];
  score: number;
  timeLeft: number;

  constructor(playingCards: Card[], winnerCards: Card[], score: number, timeLeft: number) {
    this.playingCards = playingCards;
    this.winnerCards = winnerCards;
    this.score = score;
    this.timeLeft = timeLeft;
  }

  public getPlayingCards(): Card[] {
    return this.playingCards;
  }

  public setPlayingCards(cards: Card[]) {
    this.playingCards = cards;
  }

  public getWinnerCards(): Card[] {
    return this.winnerCards;
  }

  public setWinnerCards(cards: Card[]) {
    this.winnerCards = cards;
  }

  public getScore(): number {
    return this.score;
  }

  public setScore(score: number) {
    this.score = score;
  }

  public getTimeLeft(): number {
    return this.timeLeft;
  }

  public setTimeLeft(time: number) {
    this.timeLeft = time;
  }
}

import { Player } from './player';

export interface Game {
  id: string;
  course: string;
  name: string;
  players: Player[];
  tee: string;
}
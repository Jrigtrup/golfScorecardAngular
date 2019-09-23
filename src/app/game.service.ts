import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Game } from './interfaces/game';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  private names: any;
  private gamesRef: AngularFirestoreCollection;

  constructor(private db: AngularFirestore) { 
    this.gamesRef = this.db.collection<Game>('games');
  }

  createNewGame(courseId, tee, docId) {
    const number = Math.floor(Math.random());
    const randomName = this.names[number].name;
    const game = {
      course: courseId,
      tee: tee,
      name: randomName,
      players: randomName
      }

    return this.gamesRef.doc(docId).set(game)
  }

  saveGame(gameId, game) {
    return this.gamesRef.doc(gameId).update(game)
  }

  updateGameName(gameId, name) {
    this.gamesRef.doc(gameId).update({name: name})
  }

  updateTee(tee, gameId) {
    this.gamesRef.doc(gameId).update({tee: tee})
  }

  deleteGame(gameId) {
    this.gamesRef.doc(gameId).delete()
  }
}
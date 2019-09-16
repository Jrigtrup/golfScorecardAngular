import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentChangeAction, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Player } from './interfaces/player';
import { Game } from './interfaces/game';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  private names: any;
  private gamesRef: AngularFirestoreCollection;

  constructor(private db: AngularFirestore) { 
    this.gamesRef = this.db.collection<Game>('games');
    this.names = [
      {
        "name": "Ut Fugiat"
      },
    ]
  }

  getSavedGame(id: string): Observable<Game> {
    return this.gamesRef.doc<Game>(id)
      .valueChanges()
      .pipe(
        catchError(this.errorHandler)
      );
  }

  getSavedGames(): Observable<Game[]> {
    return this.gamesRef.snapshotChanges()
      .pipe(
        map((games: DocumentChangeAction<Game>[]): Game[] => {
          return games.map((game: DocumentChangeAction<Game>): Game => {
            return {
              id: game.payload.doc.id,
              course: game.payload.doc.data().course,
              name: game.payload.doc.data().name,
              players: game.payload.doc.data().players,
              tee: game.payload.doc.data().tee
            };
          });
        }),
        catchError(this.errorHandler) 
      ); 
  }

  createNewGame(courseId, tee, docId) {
    const number = Math.floor(Math.random() * 100);
    const randomName = this.names[number].name;

    const game = {
      course: courseId,
      tee: tee,
      name: randomName,
      players: [
        {
          name: null,
          scores: [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
          totals: {
            in: '-',
            out: '-',
            total: '-'
          }
        },
        {
          name: null,
          scores: [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
          totals: {
            in: '-',
            out: '-',
            total: '-'
          }
        },
        {
          name: null,
          scores: [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
          totals: {
            in: '-',
            out: '-',
            total: '-'
          }
        },
        {
          name: null,
          scores: [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
          totals: {
            in: '-',
            out: '-',
            total: '-'
          }
        }
      ]
    }
    return this.gamesRef.doc(docId).set(game)
      .then(_ => console.log('Success on set'))
      .catch(error => console.log('add', error));
  }

  saveGame(gameId, game) {
    return this.gamesRef.doc(gameId).update(game)
      .then(_ => console.log('Success on update'))
      .catch(error => console.log('update', error));
  }

  updateGameName(gameId, name) {
    this.gamesRef.doc(gameId).update({name: name})
    .then(_ => console.log('Success on update'))
    .catch(error => console.log('update', error));
  }

  updateTee(tee, gameId) {
    this.gamesRef.doc(gameId).update({tee: tee})
  }

  deleteGame(gameId) {
    this.gamesRef.doc(gameId).delete()
    .then(_ => console.log('Success on update'))
    .catch(error => console.log('update', error));
  }

  private errorHandler(error) {
    console.log(error);
    return throwError(error);
  }
}
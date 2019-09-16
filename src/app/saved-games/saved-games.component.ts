import { Component, OnInit } from '@angular/core';
import { GameService } from '../game.service';
import { Game } from '../interfaces/game';
import { Location } from '@angular/common';

@Component({
  selector: 'app-saved-games',
  templateUrl: './saved-games.component.html',
  styleUrls: ['./saved-games.component.scss']
})
export class SavedGamesComponent implements OnInit {

  savedGames: Game[];

  constructor(private gameService: GameService, private location: Location) { }

  ngOnInit() {
    this.gameService
    .getSavedGames()
    .subscribe(data => {
      this.savedGames = data;
    });
  }
  goBack() {
    this.location.back();
  }
  deleteGame(gameId) {
    this.gameService.deleteGame(gameId);
  }
}

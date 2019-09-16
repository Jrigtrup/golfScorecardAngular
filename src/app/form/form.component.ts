import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GameService } from '../game.service';
import * as uuid from 'uuid';
import { Location } from '@angular/common';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  courseId: string;
  tee: string;
  formMode: string;
  gameId: string;

  constructor(private route: ActivatedRoute, private gameService: GameService, private router: Router, private location: Location) {}

  ngOnInit() {
    this.courseId = this.route.snapshot.paramMap.get('id');
    this.formMode = this.route.snapshot.paramMap.get('edit');
    this.gameId = this.route.snapshot.paramMap.get('gameId');
  }

  select(teeType) {
    this.tee = teeType.target.id;
    this.createNewGame();
  }

  edit(teeType) {
    this.tee = teeType.target.id;
    this.gameService.updateTee(this.tee, this.gameId);
    this.location.back();
  }

  createNewGame() {
    const docId = uuid.v4();
    console.log(this.tee);
    this.gameService.createNewGame(this.courseId, this.tee, docId)
    .then(_ => this.router.navigate(['/card', docId]));
  }

  goBack() {
    this.location.back();
  }
}

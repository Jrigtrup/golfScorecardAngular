import { Component, OnInit } from '@angular/core';
import { CourseService } from '../course-selection/course.service';
import { ActivatedRoute } from '@angular/router';
import { GameService } from '../game.service';


@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  gameId: string;
  courseId: string;
  tee: string;
  holes: any;
  data: any;
  game: any;
  show: boolean = false;
  savepop: boolean = false;

  constructor(private courseService: CourseService, private route: ActivatedRoute, private gameService: GameService) {
  }

  ngOnInit() {
    this.gameId = this.route.snapshot.paramMap.get('id');
  }

  editPlayerName(element) {
    const newName = element.target.textContent;
    const playerId = element.target.id
    this.game.players[playerId].name = newName;
  }

  getCourseData() {
    this.courseService
    .getGolfCourse(this.courseId)
    .subscribe(data => {
      this.data = data.data;
      this.holes = data.data.holes;
    });
  }

  updateScore(event) {
    const playerId = (event.target.id.charAt(1) - 1);
    let holeNumber;
    if(event.target.id.length === 4) {
      holeNumber = (event.target.id.charAt(3) - 1);
    }
    else {
      holeNumber = Number((event.target.id.charAt(3)) + (event.target.id.charAt(4)) - 1);
    }
    const newScore = event.target.textContent !== '' ? Number(event.target.textContent) : null;
    this.game.players[playerId].scores[holeNumber] = newScore;
    this.updateTotals(playerId);
  }

  updateTotals(playerId) {
    let outtotal = 0;
    let intotal = 0;
    let total = 0;
    for(let i = 0; i <= 8; i++) {
      outtotal += this.game.players[playerId].scores[i];
    }
    for(let i = 9; i <= 17; i++) {
      intotal += this.game.players[playerId].scores[i];
    }
    total = outtotal + intotal;
    this.game.players[playerId].totals.in = intotal;
    this.game.players[playerId].totals.out = outtotal;
    this.game.players[playerId].totals.total = total;
  }

  updateGameName(element) {
    this.show = false;
    const name = element.value;
    this.game.name = name;
    this.gameService.saveGame(this.gameId, this.game)
  }
}
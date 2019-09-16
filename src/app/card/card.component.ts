import { Component, OnInit, ɵConsole } from '@angular/core';
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
    this.getSavedGame(this.gameId);
  }

  editPlayerName(element) {
    const newName = element.target.textContent;
    const playerId = element.target.id
    this.game.players[playerId].name = newName;
  }

  getSavedGame(id) {
    this.gameService
    .getSavedGame(id)
    .subscribe(data => {
      // console.log(data);
      this.game = data;
      this.courseId = data.course;
      this.tee = data.tee;
      console.log(this.tee);
      this.getCourseData();
    });
  }

  getCourseData() {
    this.courseService
    .getGolfCourse(this.courseId)
    .subscribe(data => {
      this.data = data.data;
      this.holes = data.data.holes;
      console.log(this.data);
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
    console.log(this.game.players[playerId]);
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

  saveGame() {
    if(!this.game.name) {
      this.show = true;
    }
    else {
      this.show = false;
      this.savepop = true;
      this.gameService.saveGame(this.gameId, this.game)
    }
  }

  closeSave() {
    this.show = false;
  }

  hide() {
    this.savepop = false;
  }

}




// 18300 pro champion men women
// 11819 pro champion men women
// 19002 champion men women
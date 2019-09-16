import { Pipe, PipeTransform } from "@angular/core";
import { CardComponent } from '../card/card.component';

@Pipe({
  name: "duplicateName"
})
export class DuplicateNamePipe implements PipeTransform {

  constructor(private card: CardComponent) {}

  transform(value: any, ...args: any[]): any {
    const parent = args[1].parentNode;
    const playerId = args[0];
    const children = [parent.children[4], parent.children[5], parent.children[6], parent.children[7]]



    if (value) {
      for(let i = 0; i < children.length; i++) {
        if(playerId != children[i].id) {
          if(value === children[i].textContent) {
            let player = playerId + 1;
            return `Player ${player}`;
          }
        }
      }
    }
    return value;
  }
}

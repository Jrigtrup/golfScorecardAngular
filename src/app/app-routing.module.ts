import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CourseSelectionComponent } from './course-selection/course-selection.component';
import { CardComponent } from './card/card.component';
import { FormComponent } from './form/form.component';
import { SavedGamesComponent } from './saved-games/saved-games.component';


const routes: Routes = [
  { path: '', pathMatch: 'full', component: CourseSelectionComponent },
  { path: 'form/:id/:edit', component: FormComponent },
  { path: 'form/:id/:edit/:gameId', component: FormComponent },
  { path: 'card/:id', component: CardComponent },
  { path: 'saved-games', component: SavedGamesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

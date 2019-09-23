import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { MatFormFieldModule, MatSelectModule, MatCardModule, MatButtonModule } from '@angular/material';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CourseSelectionComponent } from './course-selection/course-selection.component';
import { CardComponent } from './card/card.component';
import { FormComponent } from './form/form.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from 'src/environments/environment';
import { SavedGamesComponent } from './saved-games/saved-games.component';

@NgModule({
  declarations: [
    AppComponent,
    CourseSelectionComponent,
    CardComponent,
    FormComponent,
    SavedGamesComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    HttpClientModule,
    MatFormFieldModule,
    MatSelectModule,
    MatCardModule,
    MatButtonModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

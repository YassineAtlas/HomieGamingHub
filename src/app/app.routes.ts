import { RouterModule, Routes } from '@angular/router';
import { ScoresComponent } from './scores/scores';
import { HomepageComponent } from './components/homepage/homepage';


export const routes: Routes = [
  { path: '', component: HomepageComponent }, // page d'accueil
  { path: 'scores', component: ScoresComponent }, // page des scores
];

import { Routes } from '@angular/router';
import { ScoresComponent } from './components/scores/scores';
import { HomepageComponent } from './components/homepage/homepage';
import { LoginComponent } from './components/login/login';
import { Games } from './components/games/games';

export const routes: Routes = [
  { path: '', component: HomepageComponent }, // page d'accueil
  { path: 'games/guessnumber', component: ScoresComponent},
  { path: 'login', component: LoginComponent }, // page de connexion
  { path: 'games', component: Games },


  { path: '**', redirectTo: '' }  // rediriger les routes inconnues vers la page d'accueil
];

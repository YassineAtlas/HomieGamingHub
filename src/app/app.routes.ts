import { RouterModule, Routes } from '@angular/router';
import { ScoresComponent } from './scores/scores';
import { HomepageComponent } from './components/homepage/homepage';
import { LoginComponent } from './components/login/login';
import { authGuard } from './core/auth.guard';

export const routes: Routes = [
  { path: '', component: HomepageComponent }, // page d'accueil
  { path: 'scores', component: ScoresComponent,canActivate: [authGuard] },
  { path: 'login', component: LoginComponent }, // page de connexion
];

import { Component, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-games',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './games.html',
  styleUrls: ['./games.css']
})
export class Games {
  constructor(
    private auth: AuthService,
    private router: Router
  ) {effect(() => {
      // ⛔ attendre que l'auth soit prête
                console.log("vérification de l'authentification pour accéder aux jeux",!this.auth.authReady());

      if (!this.auth.authReady()) return;
          console.log("vérification de l'authentification pour accéder aux jeux",!this.auth.authReady());
      // ❌ pas connecté → login
      if (!this.auth.user()) {
        this.router.navigate(['/login']);
      }
    });
} 

  clickgame(){
    this.router.navigate(['/games/guessnumber']);
  }
  games = [
    {
      emoji: '😂',
      title: 'Laugh at others',
      comingSoon: false
    },
    {
      emoji: '😈',
      title: 'Be annoying',
      comingSoon: true
    },
    {
      emoji: '🏆',
      title: 'Win. Brag.',
      comingSoon: true
    },
    {
      emoji: '😤',
      title: 'Rage a little',
      comingSoon: true
    }
  ];
  
}

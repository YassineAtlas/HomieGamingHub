import { Component, effect } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-homepage',
  standalone: true,
  templateUrl: './homepage.html',
  styleUrls: ['./homepage.css']
})
export class HomepageComponent {

  constructor(auth: AuthService,private router: Router) {
    effect(() => {
      if (auth.isAuthenticated()) {
        router.navigate(['/scores']);
      }
    });
  }

  /**
   * Clic sur le bouton Login (header)
   */
  goToLogin(): void {
    this.router.navigate(['/login']);
  }

  /**
   * Clic sur le CTA principal
   * (pour l’instant même comportement que login)
   */
  playWithFriends(): void {
    this.router.navigate(['/login']);
  }

}

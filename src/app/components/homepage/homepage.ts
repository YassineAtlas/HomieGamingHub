import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-homepage',
  standalone: true,
  templateUrl: './homepage.html',
  styleUrls: ['./homepage.css']
})
export class HomepageComponent {

  constructor(private router: Router) {}

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

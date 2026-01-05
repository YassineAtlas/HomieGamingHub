import { Component, effect } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './homepage.html',
  styleUrls: ['./homepage.css']
})
export class HomepageComponent {
  constructor(private auth: AuthService,
      private router: Router) {effect(() => {
        if (this.auth.isAuthenticated()) {
          this.router.navigate(['/games']);
        }
  });}

  goToLogin() {
    this.router.navigate(['/login']);
  }
}

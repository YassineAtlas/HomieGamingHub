import { Component, effect, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.html',
  styleUrls: ['./header.css']
})
export class HeaderComponent {
  menuOpen = signal(false);

  constructor(
    public auth: AuthService,
    private router: Router
  ) {}

  goToLogin() {
    this.router.navigate(['/login']);
  }
  goHome() {
  if (this.auth.isAuthenticated()) {
    this.router.navigate(['/games']);
  } else {
    this.router.navigate(['/']);
  }
}

  goToProfile() {
    this.menuOpen.set(false);
    this.router.navigate(['/profile']);
  }
  goToSettings() {
    this.menuOpen.set(false);
    this.router.navigate(['/settings']);
  }

  async logout() {
    this.menuOpen.set(false);
    await this.auth.logout();
    console.log("déconnecté");
    this.router.navigate(['/']);
  }

  toggleMenu() {
    this.menuOpen.update(v => !v);
  }
}

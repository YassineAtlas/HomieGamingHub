import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-scores',
  standalone: true,
  templateUrl: './scores.html',
  styleUrls: ['./scores.css']
})
export class ScoresComponent {
  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  async logout() {
    await this.auth.logout();
    this.router.navigate(['/']);
  }
}

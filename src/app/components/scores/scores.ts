import { Component, effect } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

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
  ) {
    effect(() => {
      // ⛔ attendre Supabase
      if (!this.auth.authReady()) return;

      // ✅ non connecté → games
      if (!this.auth.user()) {
        this.router.navigate(['/login']);
      }
    });
}

gotogames() {
    this.router.navigate(['/games']);
    console.log("zrayga");
      }


}
import { Component, effect, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

type Mode = 'login' | 'register';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent {
  mode = signal<Mode>('login');
  loading = signal(false);
  error = signal<string | null>(null);

  email = '';
  password = '';
  username = '';


  constructor(
    private auth: AuthService,
    private router: Router
  ) {
    effect(() => {
      // ⛔ attendre Supabase
      if (!this.auth.authReady()) return;

      // ✅ déjà connecté → games
      if (this.auth.user()) {
        this.router.navigate(['/games']);
      }
    });
  }

  toggleMode() {
    this.mode.set(this.mode() === 'login' ? 'register' : 'login');
    this.error.set(null);
    this.username = '';
  }

  async submit() {
    this.loading.set(true);
    this.error.set(null);

    try {
      const result =
        this.mode() === 'login'
          ? await this.auth.login(this.email, this.password)
          : await this.auth.registerWithUsername(this.email, this.password, this.username);

      if (result?.error) {
          if (result.error.message.includes('duplicate')) {
            this.error.set('Username already taken');
          } else {
            this.error.set(result.error.message);
          }
          return;
        } 

      // ✅ connecté → redirection
      this.router.navigate(['/games']);
    } catch {
      this.error.set('Something went wrong. Try again.');
    } finally {
      this.loading.set(false);
    }
  }
}

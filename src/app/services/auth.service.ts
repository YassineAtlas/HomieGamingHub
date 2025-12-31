import { Injectable, signal } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private supabase: SupabaseClient;

  user = signal<any | null>(null);
  loading = signal(true);

  constructor() {
    this.supabase = createClient(
      environment.supabaseUrl,
      environment.supabaseAnonKey
    );

    this.init();
  }

  private async init() {
    const { data } = await this.supabase.auth.getSession();
    this.user.set(data.session?.user ?? null);
    this.loading.set(false);

    this.supabase.auth.onAuthStateChange((_event, session) => {
      this.user.set(session?.user ?? null);
    });
  }

  // 🔐 LOGIN
  async login(email: string, password: string) {
    return this.supabase.auth.signInWithPassword({ email, password });
  }

  // 🆕 REGISTER
  async register(email: string, password: string) {
    return this.supabase.auth.signUp({ email, password });
  }

  // 🚪 LOGOUT
  async logout() {
    await this.supabase.auth.signOut();
    this.user.set(null);
  }

  isAuthenticated(): boolean {
    return !!this.user();
  }
}

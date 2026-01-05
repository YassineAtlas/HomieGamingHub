import { Injectable, signal, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private supabase: SupabaseClient | null = null;
  private platformId = inject(PLATFORM_ID);

  // 🔐 Auth
  user = signal<any | null>(null);
  loading = signal(true);

  // 👤 Profile
  profile = signal<any | null>(null);
  authReady = signal(false);

  constructor() {
    // ✅ On initialise TOUJOURS le service
    // ❌ mais Supabase UNIQUEMENT côté browser
    if (isPlatformBrowser(this.platformId)) {
      this.supabase = createClient(
        environment.supabaseUrl,
        environment.supabaseAnonKey
      );

      this.init();
    } else {
      // SSR : état neutre
      this.loading.set(false);
      this.authReady.set(false);
    }
  }

  // ======================
  // INIT SESSION (SSR SAFE)
  // ======================
  private async init() {
    if (!this.supabase) return;

    // 1️⃣ Restaurer la session (browser uniquement)
    const { data } = await this.supabase.auth.getSession();
    this.user.set(data.session?.user ?? null);

    if (this.user()) {
      this.loadProfile();
    }

    // 2️⃣ Écouter les changements
    this.supabase.auth.onAuthStateChange((_event, session) => {
      this.user.set(session?.user ?? null);

      if (session?.user) {
        this.loadProfile();
      } else {
        this.profile.set(null);
      }
    });

    // 3️⃣ FIN DU LOADING (APRÈS getSession)
    this.loading.set(false);
    this.authReady.set(true);
  }

  // ======================
  // AUTH ACTIONS (INCHANGÉES)
  // ======================
  async login(email: string, password: string) {
    return this.supabase!.auth.signInWithPassword({
      email,
      password
    });
  }

  async isUsernameAvailable(username: string): Promise<boolean> {
    const { data, error } = await this.supabase!
      .from('profiles')
      .select('username')
      .eq('username', username)
      .limit(1);

    if (error) {
      console.error('Username check failed', error);
      return false;
    }

    return data.length === 0;
  }

  async registerWithUsername(
    email: string,
    password: string,
    username: string
  ) {
    const available = await this.isUsernameAvailable(username);
    if (!available) {
      return { error: { message: 'Username already taken' } };
    }

    const { data, error } = await this.supabase!.auth.signUp({
      email,
      password
    });

    if (error || !data.user) {
      return { error };
    }

    return this.supabase!.from('profiles').insert({
      id: data.user.id,
      username
    });
  }

  async logout() {
    await this.supabase!.auth.signOut();
    this.user.set(null);
    this.profile.set(null);
  }

  // ======================
  // PROFILE (INCHANGÉ)
  // ======================
  async loadProfile() {
    if (!this.user() || !this.supabase) return;

    const { data, error } = await this.supabase
      .from('profiles')
      .select('*')
      .eq('id', this.user()!.id)
      .single();

    if (!error) {
      this.profile.set(data);
    }
  }

  // ======================
  // HELPERS (INCHANGÉS)
  // ======================
  isAuthenticated(): boolean {
    return !!this.user();
  }

  get username(): string | null {
    return this.profile()?.username ?? null;
  }
}

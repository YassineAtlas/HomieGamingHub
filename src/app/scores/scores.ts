import { Component, signal, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { supabase } from '../core/supabase.client';

@Component({
  selector: 'app-scores',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h1>Table de test 🎮</h1>

    @if (error()) {
      <p style="color:red">Erreur : {{ error() }}</p>
    }

    <ul>
      @for (item of data(); track item.id) {
        <li>{{ item.id }} - {{ item.name }}</li>
      }
    </ul>
  `
})
export class ScoresComponent implements OnInit, OnDestroy {
  data = signal<any[]>([]);
  error = signal<string | null>(null);
  channel: any;

  async ngOnInit() {
    await this.refreshData();

    // ⚡ S'abonner aux changements en temps réel
    this.channel = supabase
      .channel('test-changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'test' },
        (payload) => {
          console.log('Changement détecté:', payload);
          this.refreshData();
        }
      );

    this.channel.subscribe();
  }

  async refreshData() {
    const { data, error } = await supabase.from('test').select('*');
    if (error) {
      this.error.set(error.message);
    } else {
      this.data.set(data ?? []);
    }
  }

  ngOnDestroy() {
    if (this.channel) {
      this.channel.unsubscribe();
    }
  }
}

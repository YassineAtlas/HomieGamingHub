import { Component } from '@angular/core';

@Component({
  selector: 'app-scores',
  standalone: true,
  template: `
    <h1>Bienvenue sur HomieGamingHub 🎮</h1>

    <h2>Scores de test</h2>
<ul>
  @for (score of scores; track score) {
    <li>Score : {{ score }}</li>
  }
</ul>

  `,
  styles: [`
    h1 { color: #4CAF50; }
    h2 { margin-top: 20px; }
    ul { list-style: none; padding: 0; }
    li { margin: 5px 0; }
  `]
})
export class ScoresComponent {
  scores = [120, 95, 80];
}

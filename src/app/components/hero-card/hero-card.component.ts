import { Component, input } from '@angular/core';
import { Hero } from '../../../interfaces/hero.interface';
import { MatCard, MatCardModule } from "@angular/material/card";

@Component({
  selector: 'app-hero-card',
  imports: [MatCard, MatCardModule],
  templateUrl: './hero-card.component.html',
  styleUrl: './hero-card.component.scss',
})
export class HeroCardComponent {
  hero = input<Hero>();
}

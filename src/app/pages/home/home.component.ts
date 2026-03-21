import { Component, inject } from '@angular/core';
import { HeroStore } from '../../../store/heroes.store';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { HeroCardComponent } from "../../components/hero-card/hero-card.component";

@Component({
  selector: 'app-home',
  imports: [CommonModule, MatCardModule, HeroCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {

  appStore = inject(HeroStore);





}

import { Component, inject, } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeroStore } from '../store/heroes.store';
import { HeroesService } from './services/heroes.service';
import { HeaderComponent } from "./components/header/header.component";
import { FooterComponent } from "./components/footer/footer.component";
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, FooterComponent, MatProgressSpinnerModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  heroService = inject(HeroesService);
  appStore = inject(HeroStore);
}

import { Component, effect, inject, signal } from '@angular/core';
import { HeroStore } from '../../../store/heroes.store';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-header',
  imports: [MatButtonModule, MatFormFieldModule, MatInputModule, MatIconModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  appStore = inject(HeroStore);

  query = signal('');
  private debounceTimer: any;

  private searchEffect = effect(() => {
    const value = this.query();
    clearTimeout(this.debounceTimer);
    this.debounceTimer = setTimeout(() => {
      this.appStore.changedQuery({ query: value });
      this.appStore.loadHeroes();
    }, 800);
  });

  onInput(event: Event) {
    this.query.set((event.target as HTMLInputElement).value);
  }
}

import { Component, inject, } from '@angular/core';
import { HeroStore } from '../../../store/heroes.store';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-header',
  imports: [ReactiveFormsModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatIconModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {

  appStore = inject(HeroStore);
  searchControl = new FormControl('', { nonNullable: true });

  constructor() {
    this.searchControl.valueChanges
      .pipe(
        distinctUntilChanged(),
        debounceTime(500))
      .subscribe((value) => {
        this.appStore.changedFilters({ query: value });
        this.appStore.loadHeroes();
      });
  }

}

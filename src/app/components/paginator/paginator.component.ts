import { Component, inject } from '@angular/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { HeroStore } from '../../../store/heroes.store';

@Component({
  selector: 'app-paginator',
  imports: [MatPaginatorModule],
  templateUrl: './paginator.component.html',
  styleUrl: './paginator.component.scss',
})
export class PaginatorComponent {
  appStore = inject(HeroStore);

  pageChange(event: any) {
    this.appStore.changedPage({ page: event.pageIndex + 1, limit: event.pageSize })
    this.appStore.loadHeroes();

  }
}

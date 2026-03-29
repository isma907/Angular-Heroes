import { withDevtools } from '@angular-architects/ngrx-toolkit';
import {
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { Hero, HeroState } from '../interfaces/hero.interface';
import { computed, inject } from '@angular/core';
import { HeroesService } from '../app/services/heroes.service';
import { delay, pipe } from 'rxjs';

const initialState: HeroState = {
  heroes: [],
  loading: false,
  filter: {
    query: '',
    page: 1,
    limit: 15,
    totalItems: 0,
    totalPages: 0,
  },
};

export const HeroStore = signalStore(
  { providedIn: 'root' },
  withDevtools('appState'),
  withState(initialState),
  withMethods((store, heroService = inject(HeroesService)) => ({
    setLoading(loading: boolean) {
      patchState(store, { loading });
    },

    resetFilters() {
      patchState(store, {
        filter: initialState.filter,
      });
    },


    changedQuery(filter: Partial<HeroState['filter']>) {
      patchState(store, (state) => ({
        filter: { ...state.filter, ...filter, page: 1 },
      }));
    },

    changedPage(filter: Partial<HeroState['filter']>) {
      patchState(store, (state) => ({
        filter: { ...state.filter, ...filter },
      }));
    },

    loadHeroes() {
      patchState(store, { loading: true });
      const { query, page, limit } = store.filter();
      this.setLoading(true);

      heroService
        .getHeroes({ query, page, limit })
        .pipe(delay(3000))
        .subscribe({
          next: (res: any) => {
            const { data, totalItems, totalPages } = res;
            patchState(store, {
              heroes: data,
              filter: { ...store.filter(), totalItems, totalPages },
              loading: false,
            });
          },
          error: (err) => {
            console.error('API ERROR', err);
            patchState(store, { loading: false });
          },
        });
    },
  })),

  withHooks({
    onInit(store) {
      store.loadHeroes();
    },
  }),

  withComputed(({ heroes, filter }) => ({
    totalHeroes: computed(() => heroes()?.length || 0),
    getPages: computed(() => {
      const { totalPages, page } = filter();
      const array = Array.from({ length: totalPages }, (_, i) => i + 1);

      const maxVisiblePages = 5;
      const half = Math.floor(maxVisiblePages / 2);

      let startPage = Math.max(1, page - half);
      let endPage = Math.min(totalPages, page + half);

      if (page - half < 1) {
        endPage = Math.min(totalPages, maxVisiblePages);
      }

      if (page + half > totalPages) {
        startPage = Math.max(1, totalPages - maxVisiblePages + 1);
      }

      const pages = array.slice(startPage - 1, endPage);
      return pages;
    }),
  })),
);

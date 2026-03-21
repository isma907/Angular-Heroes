import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Hero } from '../../interfaces/hero.interface';

interface pagination {
  page: number;
  limit: number;
  query: string;
}

@Injectable({
  providedIn: 'root',
})

export class HeroesService {
  http = inject(HttpClient)

  getHeroes(pagination: pagination) {
    const url = `http://localhost:4000/superheroes/characters?page=${pagination.page}&limit=${pagination.limit}&query=${pagination.query}`;
    return this.http.get<{ data: Hero[], totalItems: number, totalPages: number }>(url);
  }
}

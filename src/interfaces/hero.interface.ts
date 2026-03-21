export interface HeroState {
  heroes: Hero[];
  loading: boolean;
  filter: {
    query: string;
    page: number;
    limit: number;
    totalItems: number;
    totalPages: number;
  };
}

export interface Hero {
  _id: string;
  name: string;
  imageUrl: string;
  firstAppearance: string;
  publisher: string;
}

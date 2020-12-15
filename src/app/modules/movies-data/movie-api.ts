export interface Movie {
  title: string;
  year: number;
  imdbId: string;
  type: string;
}

export class MovieImpl implements Movie{
  constructor(title: string, year: number, imdbId: string, type: string) {
    this.title = title;
    this.year = year;
    this.imdbId = imdbId;
    this.type = type;
  }
  readonly title: string;
  readonly year: number;
  readonly imdbId: string;
  readonly type: string;
}

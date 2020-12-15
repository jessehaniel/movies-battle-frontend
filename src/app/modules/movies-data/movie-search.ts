export interface MovieMinimal {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string; // movie, series, episode
}

export class MovieMinimalImpl implements MovieMinimal {
  constructor(Title: string, Year: string, imdbID: string, Type: string) {
    this.Title = Title;
    this.Year = Year;
    this.imdbID = imdbID;
    this.Type = Type;
  }

  readonly Title: string;
  readonly Year: string;
  readonly imdbID: string;
  readonly Type: string;
}

export interface MovieSearchResult {
  Search: MovieMinimal[];
  totalResults: number;
  Response: boolean;
}

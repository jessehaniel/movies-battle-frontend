import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { MovieMinimal, MovieSearchResult } from '../movie-search';
import { Movie, MovieImpl } from '../movie-api';

@Injectable({
  providedIn: 'root'
})
export class DataManagerService {

  private readonly imdbUrl: string;
  private readonly searchParam: string;
  private readonly pageParam: string;
  private readonly detailsParam: string;
  private readonly apiUrl: string;

  constructor(private http: HttpClient) {
    this.apiUrl = environment.apiUrl;
    this.imdbUrl = environment.imdbUrl;
    this.searchParam = environment.searchParam;
    this.pageParam = environment.pageParam;
    this.detailsParam = environment.detailsParam;
  }

  search = (movieTitle: string, page = 1) =>
    this.http.get<MovieSearchResult>(`${this.imdbUrl}${this.searchParam}${movieTitle}${this.pageParam}${page}`)

  detail = (imdbId: string) => this.http.get<MovieMinimal>(`${this.imdbUrl}${this.detailsParam}${imdbId}`);

  list = () => this.http.get<Movie[]>(`${this.apiUrl}`);

  add = (movie: MovieMinimal) => {
    return this.http.post(`${this.apiUrl}`, new MovieImpl(movie.Title, +movie.Year, movie.imdbID, movie.Type));
  }

  remove = (imdbId: string) => this.http.delete(`${this.apiUrl}/${imdbId}`);

}

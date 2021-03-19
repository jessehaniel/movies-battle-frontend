import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DataManagerService } from './data-manager.service';
import { MovieMinimal, MovieMinimalImpl } from '../movie-search';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-data-manager',
  templateUrl: './data-manager.component.html',
  styleUrls: ['./data-manager.component.css']
})
export class DataManagerComponent {

  form: FormGroup;
  showClear = false;
  hasSearchResults = false;
  moviesFavorite: MovieMinimal[] = [];
  moviesResult: MovieMinimal[] = [];
  resultSize = 0;
  resultPage = 1;

  constructor(private service: DataManagerService,
              private formBuilder: FormBuilder,
  ) {
    this.form = this.formBuilder.group({
      movieTitle: ''
    });
    this.refreshFavorites();
  }

  refreshFavorites(): void {
    this.service.list()
    .pipe(
      map(value => value.map(m => new MovieMinimalImpl(m.title, m.year?.toString(), m.imdbId, m.type)))
    )
    .subscribe(movies => this.moviesFavorite = movies);
  }

  search(page?: number): void {
    this.service.search(this.form.value.movieTitle, page)
    .subscribe(
      result => {
        this.hasSearchResults = true;
        this.moviesResult = result.Search;
        this.resultSize = result.totalResults;
      }
    );
  }

  clearSearch = () => {
    this.form.reset();
    this.showClear = false;
    this.hasSearchResults = false;
    this.moviesResult = [];
    this.refreshFavorites();
  }

  changeShowClear = () => this.showClear = this.form.value.movieTitle.length > 0;

  addRow(imdbID: string): void {
    const movie = this.moviesResult.filter(m => m.imdbID === imdbID)[0];
    this.moviesResult.splice(this.moviesResult.indexOf(movie), 1);
    this.addFavoriteMovie(movie);
  }

  removeRow(imdbID: string): void {
    this.deleteFavoriteMovie(imdbID);
  }

  private addFavoriteMovie(movie: MovieMinimal): void {
    this.service.add(movie)
    .subscribe(() => this.refreshFavorites());
  }

  private deleteFavoriteMovie(imdbID: string): void {
    const movie = this.moviesFavorite.filter(m => m.imdbID === imdbID)[0];
    this.service.remove(imdbID)
    .subscribe(m => {
      // tslint:disable-next-line:no-unused-expression
      this.hasSearchResults && this.moviesResult.push(movie);
      this.refreshFavorites();
    });
  }

}

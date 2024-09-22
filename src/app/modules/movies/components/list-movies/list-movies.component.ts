import {Component, OnDestroy, OnInit} from '@angular/core';
import {SearchHeaderComponent} from "../../../../shared/components/search-header/search-header.component";
import {MovieItemComponent} from "../../../../shared/components/movie-item/movie-item.component";
import {MovieSummary} from "../../../../shared/models/movie-summary.model";
import {NgForOf} from "@angular/common";
import {MoviesService} from "../../../../core/services/movies.service";
import {Subject, takeUntil} from "rxjs";

@Component({
    selector: 'app-list-movies',
    standalone: true,
    imports: [
      SearchHeaderComponent,
      MovieItemComponent,
      NgForOf,
    ],
    templateUrl: './list-movies.component.html',
    styleUrl: './list-movies.component.scss'
  }
)
export class ListMoviesComponent implements OnInit, OnDestroy {

  movies: MovieSummary[] = [];
  dataSource: MovieSummary[] = [];
  destroy$ = new Subject<void>();

  constructor(private moviesService: MoviesService) {
  }

  ngOnInit(): void {
    this.getMovies();
  }

  getMovies(): void {
    this.moviesService.findAll().pipe(
      takeUntil(this.destroy$),
    ).subscribe((movies) => {
      this.movies = movies;
      this.dataSource = movies;
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  filterMovies($event: { year: string; title: string }) {

    if ($event.year || $event.title) {
      this.dataSource = this.movies.filter((movie) => {
        const matchesTitle = movie.title.toLowerCase().includes($event.title.toLowerCase());

        if (!$event.year) {
          return matchesTitle;
        }

        const matchesYear = movie.release_date.includes($event.year);
        return matchesTitle && matchesYear;
      });
    } else {
      this.dataSource = this.movies;
    }
  }
}


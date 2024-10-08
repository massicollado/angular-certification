import {inject, Injectable} from '@angular/core';
import {MovieSummary} from "../../shared/models/movie-summary.model";
import {HttpClient} from "@angular/common/http";
import {Observable, tap} from "rxjs";
import {Movie} from "../../shared/models/movie.model";
import {environment} from "../../../environments/environment";


@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  private baseUrl: string = environment.apiUrl;
  private readonly http = inject(HttpClient);

  findAll(): Observable<MovieSummary[]> {
    return this.http
      .get<MovieSummary[]>(`${this.baseUrl}/movies`)
      .pipe(
        tap((movies) => (movies))
      )
  }

  findById(id: string): Observable<Movie> {
    return this.http.get<Movie>(`${this.baseUrl}/movies/${id}`);
  }
}

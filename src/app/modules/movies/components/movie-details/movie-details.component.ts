import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatIcon} from "@angular/material/icon";
import {MatButton} from "@angular/material/button";
import {Movie} from "../../../../shared/models/movie.model";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {MoviesService} from "../../../../core/services/movies.service";
import {
  MatCell, MatCellDef,
  MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef, MatRow,
  MatRowDef,
  MatTable
} from "@angular/material/table";

@Component({
  selector: 'app-movie-details',
  standalone: true,
  imports: [
    MatIcon,
    MatButton,
    MatTable,
    MatColumnDef,
    MatHeaderCell,
    MatCell,
    MatHeaderRowDef,
    MatRowDef,
    MatHeaderRow,
    MatRow,
    MatHeaderCellDef,
    MatCellDef,
    RouterLink
  ],
  templateUrl: './movie-details.component.html',
  styleUrl: './movie-details.component.css'
})
export class MovieDetailsComponent implements OnInit, OnDestroy {

  displayedColumns: string[] = ['title', 'value'];
  movie: Movie = {} as Movie;

  constructor(private activatedRoute: ActivatedRoute, private movieService: MoviesService) {
  }

  ngOnDestroy(): void {
  }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params['id'];
    this.movieService.findById(id).pipe().subscribe((movie) => {
      this.movie = movie;
      console.log('MovieDetailsComponent: movie', movie);
    });
  }

}

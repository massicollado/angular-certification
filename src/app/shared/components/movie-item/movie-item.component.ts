import {Component, EventEmitter, Input, Output} from '@angular/core';
import {MovieSummary} from "../../models/movie-summary.model";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-movie-item',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './movie-item.component.html',
  styleUrl: './movie-item.component.css'
})
export class MovieItemComponent {

  @Input() movie: MovieSummary = {} as MovieSummary;

}

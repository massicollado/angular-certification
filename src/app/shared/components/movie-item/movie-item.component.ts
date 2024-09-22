import {Component, Input} from '@angular/core';
import {MovieSummary} from "../../models/movie-summary.model";
import {RouterLink} from "@angular/router";
import {DurationPipe} from "../../pipes/duration.pipe";

@Component({
  selector: 'app-movie-item',
  standalone: true,
  imports: [
    RouterLink,
    DurationPipe
  ],
  templateUrl: './movie-item.component.html',
  styleUrl: './movie-item.component.css'
})
export class MovieItemComponent {

  @Input() movie: MovieSummary = {} as MovieSummary;

}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ListMoviesComponent} from "./components/list-movies/list-movies.component";
import {MovieDetailsComponent} from "./components/movie-details/movie-details.component";

export const routes: Routes = [
  {
    path: '',
    component: ListMoviesComponent
  },
  {
    path: 'details/:id',
    component: MovieDetailsComponent
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MoviesRoutingModule { }

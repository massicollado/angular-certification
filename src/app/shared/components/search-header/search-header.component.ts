import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {MatFormField, MatHint, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {FormControl, ReactiveFormsModule, Validators} from "@angular/forms";
import {debounceTime, Subject, takeUntil} from "rxjs";
import {NgIf} from "@angular/common";


@Component({
  selector: 'app-search-header',
  standalone: true,
  templateUrl: './search-header.component.html',
  imports: [
    MatLabel,
    MatFormField,
    MatInput,
    ReactiveFormsModule,
    NgIf,
    MatHint
  ],
  styleUrl: './search-header.component.css'
})
export class SearchHeaderComponent implements OnInit, OnDestroy {

  destroy$ = new Subject<void>();
  @Output() searchValue = new EventEmitter<{
    year: string,
    title: string
  }>();
  yearControl= new FormControl('',[Validators.min(2001), Validators.max(2024)]);
  nameControl = new FormControl('');


  ngOnInit(): void {
    console.log('SearchHeaderComponent initialized');
    this.startListeningSearchByName();
    this.startListeningSearchByYear();
  }

  private startListeningSearchByName() : void {
    this.nameControl.valueChanges.pipe(
      takeUntil(this.destroy$),
      debounceTime(300),
    ).subscribe((value) => {
      console.log('SearchHeaderComponent: searchValue emitted', value);
      const title = value ? value.toLowerCase() : null;
      this.searchValue.emit({
        year: this.yearControl.value || '',
        title : title || ''
      });
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private startListeningSearchByYear() {
    this.yearControl.valueChanges.pipe(
      takeUntil(this.destroy$),
      debounceTime(300),
    ).subscribe((year) => {
      if (this.yearControl.valid){
        console.log('SearchHeaderComponent: searchYear emitted', year);
        this.searchValue.emit({
          year: year || '',
          title: this.nameControl.value || ''
        });
      }
    });
  }
}

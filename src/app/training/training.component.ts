import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromTraining from '../training/training.reducer';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent {
  ongoingTraining$: Observable<boolean>;

  constructor(private store: Store<fromTraining.State>) {
    this.ongoingTraining$ = this.store.select(fromTraining.getIsTraining);

    this.store.select(fromTraining.getActiveTraining).subscribe((ex) => {
    });
  }
}

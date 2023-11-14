import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';

import { StopTrainingComponent } from './stop-training.component';
import { TrainingService } from '../training.service';
import * as fromTraining from '../training.reducer';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.css'],
})
export class CurrentTrainingComponent implements OnInit {
  progress: number = 0;
  progressInterval: any;

  constructor(
    public dialog: MatDialog,
    private trainingService: TrainingService,
    private store: Store<fromTraining.State>
  ) {}

  ngOnInit(): void {
    this.startOrResumeProgress();
  }

  startOrResumeProgress() {
    this.store.select(fromTraining.getActiveTraining).subscribe((ex) => {
      this.progress = 0;
      let step = 0;
      if (ex) {
        step = (ex.duration / 100) * 1000;
      }
      this.progressInterval = setInterval(() => {
        if (this.progress >= 100) {
          this.trainingService.completeExercise();
          clearInterval(this.progressInterval);
        }
        this.progress += 1;
      }, step);
    })
  }

  stopProgress() {
    clearInterval(this.progressInterval);
    const dialogRef = this.dialog.open(StopTrainingComponent, {
      data: {
        progress: this.progress,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        clearInterval(this.progressInterval);
        this.trainingService.cancelExercise(this.progress);
      } else {
        this.startOrResumeProgress();
      }
    });
  }
}

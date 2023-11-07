import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StopTrainingComponent } from './stop-training.component';
import { TrainingService } from '../training.service';
import { Exercise } from '../exercise.model';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.css'],
})
export class CurrentTrainingComponent implements OnInit {
  progress: number = 0;
  progressInterval: any;
  @Output() trainingExited = new EventEmitter<void>();

  constructor(
    public dialog: MatDialog,
    private trainingService: TrainingService
  ) {}

  ngOnInit(): void {
    this.startOrResumeProgress();
  }

  startOrResumeProgress() {
    let step = 0;
    const runningExercise = this.trainingService.getRunningExercise();
    if (runningExercise) {
      step = (runningExercise.duration / 100) * 1000;
    }
    this.progressInterval = setInterval(() => {
      this.progress += 1;
      if (this.progress >= 100) {
        clearInterval(this.progressInterval);
        this.trainingService.completeExercise();
      }
    }, step);
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

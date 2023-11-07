import { Component } from '@angular/core';
import { TrainingService } from './training.service';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent {
  ongoingTraining = false;

  constructor(private trainingService: TrainingService) {
    this.trainingService.exerciseChanged.subscribe(() => {
      if(this.trainingService.getRunningExercise()) {
        this.ongoingTraining = true;
      } else {
        this.ongoingTraining = false;
      }
    })
  }
}

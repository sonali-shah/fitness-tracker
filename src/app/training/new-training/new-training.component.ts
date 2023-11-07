import { Component, OnInit } from '@angular/core';
import { TrainingService } from '../training.service';
import { Exercise } from '../exercise.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit{
  availableExercises: Exercise[] = [];

  constructor(private trainingService: TrainingService) {
  }
  
  ngOnInit(): void {
    this.trainingService.fetchAvailableExercises();
    this.trainingService.availableExercisesChanged.subscribe(() => {
      this.availableExercises = this.trainingService.getAvailableExercises();
    })
  }

  startTraining(f: NgForm) {
    console.log(f);
    this.trainingService.startExercise(f.value.exercise);
  }
}

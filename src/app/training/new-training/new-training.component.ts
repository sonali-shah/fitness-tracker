import { Component, OnInit, OnDestroy } from '@angular/core';
import { TrainingService } from '../training.service';
import { Exercise } from '../exercise.model';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit, OnDestroy {
  availableExercises: Exercise[] = [];
  isLoading: boolean = false;
  avlExerciseChangedSubs?: Subscription;

  constructor(private trainingService: TrainingService) {
  }
  
  ngOnInit(): void {
    this.isLoading = true;
    this.trainingService.fetchAvailableExercises();
    this.avlExerciseChangedSubs = this.trainingService.availableExercisesChanged.subscribe(() => {
      this.isLoading = false;
      this.availableExercises = this.trainingService.getAvailableExercises();
    })
  }

  startTraining(f: NgForm) {
    this.trainingService.startExercise(f.value.exercise);
  }

  ngOnDestroy(): void {
    this.avlExerciseChangedSubs?.unsubscribe();
  }
}

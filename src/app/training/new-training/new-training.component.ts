import { Component, OnInit, OnDestroy } from '@angular/core';
import { TrainingService } from '../training.service';
import { Exercise } from '../exercise.model';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { UIService } from 'src/app/shared/ui.service';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css'],
})
export class NewTrainingComponent implements OnInit, OnDestroy {
  availableExercises: Exercise[] | undefined = [];
  isLoading: boolean = false;
  avlExerciseChangedSubs?: Subscription;
  loadingChangesSubs?: Subscription;

  constructor(
    private trainingService: TrainingService,
    private uiService: UIService
  ) {}

  ngOnInit(): void {
    this.loadingChangesSubs = this.uiService.loadingStateChanged.subscribe(
      (isLoading) => {
        this.isLoading = isLoading;
      }
    );

    this.avlExerciseChangedSubs =
      this.trainingService.availableExercisesChanged.subscribe((exercises) => {
        this.availableExercises = exercises;
      });

    this.fetchExercises();
  }

  fetchExercises() {
    this.trainingService.fetchAvailableExercises();
  }

  startTraining(f: NgForm) {
    this.trainingService.startExercise(f.value.exercise);
  }

  ngOnDestroy(): void {
    this.loadingChangesSubs?.unsubscribe();
    this.avlExerciseChangedSubs?.unsubscribe();
  }
}

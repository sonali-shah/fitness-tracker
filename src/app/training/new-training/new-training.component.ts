import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription, Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { TrainingService } from '../training.service';
import { Exercise } from '../exercise.model';
import * as fromRoot from '../../app.reducer';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css'],
})
export class NewTrainingComponent implements OnInit, OnDestroy {
  availableExercises: Exercise[] | undefined = [];
  isLoading$!: Observable<boolean>;
  avlExerciseChangedSubs?: Subscription;
  loadingChangesSubs?: Subscription;

  constructor(
    private trainingService: TrainingService,
    private store: Store<fromRoot.State>
  ) {}

  ngOnInit(): void {
    this.isLoading$ = this.store.select(fromRoot.getIsLoading);    

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
    this.avlExerciseChangedSubs?.unsubscribe();
  }
}

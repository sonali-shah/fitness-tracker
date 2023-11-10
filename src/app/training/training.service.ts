import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { Exercise } from './exercise.model';
import {
  Firestore,
  addDoc,
  collection,
  getDocs,
} from '@angular/fire/firestore';
import { Store } from '@ngrx/store';

import { UIService } from '../shared/ui.service';
import * as fromRoot from '../app.reducer';
import * as UI from '../shared/ui.actions';

@Injectable()
export class TrainingService {
  private availableExercises: Exercise[] = [];

  private runningExercise: Exercise | undefined;
  private exercises: Exercise[] = [];

  availableExercisesChanged: Subject<Exercise[] | undefined> = new Subject<
    Exercise[] | undefined
  >();
  finishedExercisesChanged: Subject<any> = new Subject<any>();
  exerciseChanged: Subject<Exercise | undefined> = new Subject<
    Exercise | undefined
  >();

  constructor(
    private db: Firestore,
    private uiService: UIService,
    private store: Store<fromRoot.State>
  ) {}

  fetchAvailableExercises() {
    this.store.dispatch(new UI.StartLoading());
    const availableExercisesCollection = collection(
      this.db,
      'availableExercises'
    );
    getDocs(availableExercisesCollection)
      .then((result) => {
        this.store.dispatch(new UI.StopLoading());
        this.availableExercises = result.docs.map((doc) => {
          return {
            name: doc.data()['name'],
            duration: doc.data()['duration'],
            calories: doc.data()['calories'],
            id: doc.id,
          };
        });
        this.availableExercisesChanged.next([...this.availableExercises]);
      })
      .catch(() => {
        this.store.dispatch(new UI.StopLoading());
        this.uiService.showSnackBar(
          'Fetching exercise is failed. Please try again',
          undefined,
          { duration: 3000 }
        );

        this.availableExercisesChanged.next(undefined);
      });
  }

  getAvailableExercises() {
    return this.availableExercises.slice();
  }

  getRunningExercise(): Exercise | undefined {
    return this.runningExercise ? { ...this.runningExercise } : undefined;
  }

  startExercise(exerciseId: string) {
    this.runningExercise = this.availableExercises.find(
      (ex) => ex.id == exerciseId
    );
    if (this.runningExercise) {
      this.exerciseChanged.next({ ...this.runningExercise });
    }
  }

  completeExercise() {
    if (this.runningExercise) {
      this.addDataToDatabase({
        ...this.runningExercise,
        date: new Date(),
        state: 'completed',
      });
      this.runningExercise = undefined;
      this.exerciseChanged.next(undefined);
    }
  }

  cancelExercise(progress: number) {
    if (this.runningExercise) {
      this.addDataToDatabase({
        ...this.runningExercise,
        date: new Date(),
        duration: this.runningExercise.duration * (progress / 100),
        calories: this.runningExercise.calories * (progress / 100),
        state: 'cancelled',
      });

      this.runningExercise = undefined;
      this.exerciseChanged.next(undefined);
    }
  }

  fetchCompletedOrCancelledExercises() {
    const finishedExercisesCollection = collection(
      this.db,
      'finishedExercises'
    );
    getDocs(finishedExercisesCollection).then((result) => {
      this.exercises = result.docs.map((doc) => {
        return {
          name: doc.data()['name'],
          duration: doc.data()['duration'],
          calories: doc.data()['calories'],
          id: doc.id,
        };
      });
      this.finishedExercisesChanged.next(true);
    });
  }

  getCompletedOrCancelledExercises() {
    return this.exercises.slice();
  }

  addDataToDatabase(exercise: Exercise) {
    const finishedExercisesCollection = collection(
      this.db,
      'finishedExercises'
    );
    addDoc(finishedExercisesCollection, exercise);
  }
}

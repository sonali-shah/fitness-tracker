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
import * as fromTraining from '../training/training.reducer';
import * as UI from '../shared/ui.actions';
import * as Training from '../training/training.actions';
import { take } from 'rxjs';

@Injectable()
export class TrainingService {
  private availableExercises: Exercise[] = [];

  private runningExercise: Exercise | undefined;
  private exercises: Exercise[] = [];

  constructor(
    private db: Firestore,
    private uiService: UIService,
    private store: Store<fromTraining.State>
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
        this.store.dispatch(new Training.AvailableExercises([...this.availableExercises]));
      })
      .catch(() => {
        this.store.dispatch(new UI.StopLoading());
        this.uiService.showSnackBar(
          'Fetching exercise is failed. Please try again',
          undefined,
          { duration: 3000 }
          );
          
        this.store.dispatch(new Training.AvailableExercises([]));
      });
  }

  getAvailableExercises() {
    return this.availableExercises.slice();
  }

  getRunningExercise(): Exercise | undefined {
    return this.runningExercise ? { ...this.runningExercise } : undefined;
  }

  startExercise(exerciseId: string) {
    this.store.dispatch(new Training.StartExercise(exerciseId));
  }

  completeExercise() {
    this.store.select(fromTraining.getActiveTraining).pipe(take(1)).subscribe((ex) => {
      if (ex) {
        this.addDataToDatabase({
          ...ex,
          date: new Date(),
          state: 'completed',
        });
        this.store.dispatch(new Training.StopExercise());
      }
    })
  }
  
  cancelExercise(progress: number) {
    this.store.select(fromTraining.getActiveTraining).pipe(take(1)).subscribe((ex) => {
      if (ex) {
        this.addDataToDatabase({
          ...ex,
          date: new Date(),
          duration: ex.duration * (progress / 100),
          calories: ex.calories * (progress / 100),
          state: 'cancelled',
        });
        
        this.store.dispatch(new Training.StopExercise());
      }
    });
  }

  fetchCompletedOrCancelledExercises() {
    const finishedExercisesCollection = collection(
      this.db,
      'finishedExercises'
    );
    getDocs(finishedExercisesCollection).then((result) => {
      this.exercises = result.docs.map((doc) => {
        let date: Date = new Date(1970, 0, 1);
        date.setSeconds(doc.data()['date']['seconds']);
        return {
          name: doc.data()['name'],
          duration: doc.data()['duration'],
          calories: doc.data()['calories'],
          date: date,
          state: doc.data()['state'],
          id: doc.id,
        };
      });
      this.store.dispatch(new Training.FinishedExercise(this.exercises));
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

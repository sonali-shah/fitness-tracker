import { Action } from '@ngrx/store';
import { Exercise } from './exercise.model';

export const AVAILABLE_EXERCISES = '[Training] Available Exercises';
export const FINISHED_EXERCISES = '[Training] Finished Exercise';
export const START_EXERCISE = '[Training] Start Exercise';
export const STOP_EXERCISE = '[Training] Stop Exercise';

export class AvailableExercises implements Action {
  readonly type = AVAILABLE_EXERCISES;

  constructor(public payload: Exercise[]) {}
}

export class FinishedExercise implements Action {
  readonly type = FINISHED_EXERCISES;

  constructor(public payload: Exercise[]) {}
}

export class StartExercise implements Action {
  readonly type = START_EXERCISE;

  constructor(public payload: string) {}
}

export class StopExercise implements Action {
  readonly type = STOP_EXERCISE;
}


export type TrainingActions = AvailableExercises | FinishedExercise | StartExercise | StopExercise;
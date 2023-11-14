import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromRoot from '../app.reducer';

import { Exercise } from './exercise.model';
import { AVAILABLE_EXERCISES, FINISHED_EXERCISES, START_EXERCISE, STOP_EXERCISE, TrainingActions } from './training.actions';

export interface TrainingState {
  availableExercises: Exercise[],
  finishedExercises: Exercise[],
  activeTraining: Exercise | null
}

export interface State extends fromRoot.State {
  training: TrainingState
}

const initialState: TrainingState = {
  availableExercises: [],
  finishedExercises: [],
  activeTraining: null
}

export function trainingReducer(state = initialState, action: TrainingActions) {
  switch(action.type) {
    case AVAILABLE_EXERCISES:
      return {
        ...state,
        availableExercises: action.payload
      }
    case FINISHED_EXERCISES:
      return {
        ...state,
        finishedExercises: action.payload
      }
    case START_EXERCISE:
      return {
        ...state,
        activeTraining: { ...state.availableExercises.find(exercise => exercise.id === action.payload) }
      }
    case STOP_EXERCISE:
      return {
        ...state,
        activeTraining: null
      }
    default:
      return initialState;
  }
}

export const getTrainingState = createFeatureSelector<TrainingState>('training');

export const getAvailableTraining = createSelector(getTrainingState, (state: TrainingState) => state.availableExercises);
export const getFinishedTraining = createSelector(getTrainingState, (state: TrainingState) => state.finishedExercises);
export const getActiveTraining = createSelector(getTrainingState, (state: TrainingState) => state.activeTraining);
export const getIsTraining = createSelector(getTrainingState, (state: TrainingState) => state.activeTraining != null);



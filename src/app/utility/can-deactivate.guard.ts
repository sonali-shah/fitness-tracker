import { CanDeactivateFn } from '@angular/router';
import { Observable } from 'rxjs';

export const canDeactivateGuard: CanDeactivateFn<CanComponentDeactivate> = (component, route, currentState, nextState) => {
  return component.canDeactivate ? component.canDeactivate() : true;
};

export interface CanComponentDeactivate {
  canDeactivate: () => Observable<boolean> | Promise<boolean> | boolean;
}
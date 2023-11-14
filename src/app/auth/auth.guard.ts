import { inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { take } from 'rxjs';

import * as fromRoot from '../app.reducer';

export const authGuard = () => {
  const store: Store = inject(Store<fromRoot.State>);

  return store.select(fromRoot.getIsAuth).pipe(take(1));
};

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WelcomeComponent } from './welcome/welcome.component';
import { authGuard } from './auth/auth.guard';
import { ProductsComponent } from './products/products.component';
import { canDeactivateGuard } from './utility/can-deactivate.guard';

const routes: Routes = [
  {
    path: '',
    component: WelcomeComponent,
  },
  {
    path: 'training',
    loadChildren: () =>
      import('./training/training.module').then((m) => m.TrainingModule),
    canMatch: [authGuard],
  },
  {
    path: 'product',
    component: ProductsComponent,
    canDeactivate: [canDeactivateGuard],
  },
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routes)],
})
export class AppRoutingModule {}

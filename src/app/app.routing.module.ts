import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WelcomeComponent } from './welcome/welcome.component';
import { SignupComponent } from './auth/signup/signup.component';
import { LoginComponent } from './auth/login/login.component';
import { TrainingComponent } from './training/training.component';
import { authGuard } from './auth/auth.guard';
import { ProductsComponent } from './products/products.component';
import { canDeactivateGuard } from './utility/can-deactivate.guard';

const routes: Routes = [
    {
        path: '',
        component: WelcomeComponent
    },
    {
        path: 'signup',
        component: SignupComponent
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'training',
        component: TrainingComponent,
        canActivate: [authGuard]
    },
    {
        path: 'product',
        component: ProductsComponent,
        canDeactivate: [canDeactivateGuard]
    }
]

@NgModule({
    exports: [RouterModule],
    imports: [RouterModule.forRoot(routes)]
})
export class AppRoutingModule {

}
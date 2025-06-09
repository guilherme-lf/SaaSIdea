import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { CadastroComponent } from './cadastro/cadastro.component';
import { LandingComponent } from './landing/landing.component';


export const routes: Routes = [
    {
      path: '',
      redirectTo: 'apresentacao',
      pathMatch: 'full'
    },
    {
      path: 'apresentacao',
      component: LandingComponent
    },
    {
      path: 'cadastro',
      loadComponent: () => import('./cadastro/cadastro.component').then(m => m.CadastroComponent)
    },
    {
      path: 'menu',
      component: AppComponent
    },
    {
      path: 'login',
      loadComponent: () => import('./login/login.component').then(m => m.LoginComponent)
    }
  ];
  
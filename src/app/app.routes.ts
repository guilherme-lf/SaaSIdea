import { Routes } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { AuthGuard } from './auth.guard';

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
    path: 'login',
    loadComponent: () => import('./login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'home',
    loadComponent: () => import('./home/home.component').then(m => m.HomeComponent),
  },
  {
    path: 'cadastro-produto',
    canActivate: [AuthGuard],
    loadComponent: () => import('./cad-prod/cad-prod.component').then(m => m.CadProdComponent),
  },
  {
    path: 'listagem-produtos',
    canActivate: [AuthGuard],
    loadComponent: () => import('./list-prod/list-prod.component').then(m => m.ListProdComponent),
  }
];
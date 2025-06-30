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
    canActivate: [AuthGuard],
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
  },
  {
    path: 'movimentacao',
    canActivate: [AuthGuard],
    loadComponent: () => import('./movimentacao/movimentacao.component').then(m => m.MovimentacaoComponent),
  },
  {
    path: 'lista-movimentacoes',
    canActivate: [AuthGuard],
    loadComponent: () => import('./list-mov/list-mov.component').then(m => m.ListMovComponent),
  },
  {
    path: 'cadastro-fornecedor',
    canActivate: [AuthGuard],
    loadComponent: () => import('./cad-fornecedores/cad-fornecedores.component').then(m => m.CadFornecedoresComponent),
  }
];
import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LandingComponent } from './landing/landing.component';
import { AuthGuard } from './auth.guard';
import { HomeComponent } from './home/home.component';


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
        path: 'home',
        loadComponent: () =>
          import('./home/home.component').then((m) => m.HomeComponent),
        canActivate: [AuthGuard]
      },
    {
      path: 'login',
      loadComponent: () => import('./login/login.component').then(m => m.LoginComponent)
    },
    {
      path: 'cadastro-produto',
      loadComponent: () => import('./cad-prod/cad-prod.component').then(m => m.CadProdComponent),
    },
    {
      path: 'ListagemProdutos',
      loadComponent: () => import('./list-prod/list-prod.component').then(m => m.ListProdComponent),
    },
  ];
  
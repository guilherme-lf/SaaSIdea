import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
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
      path: 'menu',
      component: AppComponent,
      canActivate: [AuthGuard], // Protege a rota de menu
    },
    {
      path: 'login',
      loadComponent: () => import('./login/login.component').then(m => m.LoginComponent)
    },
    {
      path: 'cadastro-produto',
      loadComponent: () => import('./cad-prod/cad-prod.component').then(m => m.CadProdComponent),
    }
  ];
  
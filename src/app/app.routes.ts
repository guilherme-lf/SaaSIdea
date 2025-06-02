import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { CadastroComponent } from './cadastro/cadastro.component';

export const routes: Routes = [
    {path: '',
        component: AppComponent,
    },
    {path: 'cadastro',
        component: CadastroComponent
    }
];

import { Component } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { MenuComponent } from './menu/menu.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MenuComponent, RouterOutlet, CommonModule, HttpClientModule, 
    FooterComponent, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'custom';
  exibirMenu = true;

  isCollapsed = false;

  constructor(private router: Router) {
    this.router.events.subscribe(() => {
      const rotaAtual = this.router.url;
      this.exibirMenu = !['/cadastro', '/login', '/apresentacao'].includes(rotaAtual);
    });
  }

  onMenuToggle(isCollapsed: boolean) {
    this.isCollapsed = isCollapsed;
  }
  
  
}


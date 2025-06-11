import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { MenuComponent } from './menu/menu.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FooterComponent } from './footer/footer.component';

@Component({
  selector: 'app-root',
  imports: [MenuComponent, RouterOutlet, CommonModule, HttpClientModule, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'custom';
  exibirMenu = true;

  constructor(private router: Router) {
    this.router.events.subscribe(() => {
      const rotaAtual = this.router.url;
      this.exibirMenu = !['/cadastro', '/login', '/apresentacao'].includes(rotaAtual);
    });
  }
  
}


import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css'
})
export class LandingComponent {

  @ViewChild('scrollContainer', { static: false }) scrollContainer!: ElementRef;

  planos = [
    {
      titulo: 'Plano Essencial',
      descricao: 'Ideal para pequenos mercados que estão começando. Ferramentas básicas de controle.'
    },
    {
      titulo: 'Plano Profissional',
      descricao: 'Soluções avançadas para gestão de estoque e vendas em mercados médios.'
    },
    {
      titulo: 'Plano Premium',
      descricao: 'Automação completa para redes de supermercado com múltiplas filiais.'
    },
    {
      titulo: 'Plano Empresarial',
      descricao: 'Plano sob demanda com recursos personalizados e suporte prioritário.'
    }
  ];
  
  scrollLeft() {
    this.scrollContainer.nativeElement.scrollBy({ left: -300, behavior: 'smooth' });
  }

  scrollRight() {
    this.scrollContainer.nativeElement.scrollBy({ left: 300, behavior: 'smooth' });
  }


}

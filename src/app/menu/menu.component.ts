import { CommonModule } from '@angular/common';
import { Component, Output, EventEmitter } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-menu',
  imports: [ CommonModule, RouterModule ],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {

  isCollapsed = false;

  @Output() menuToggled = new EventEmitter<boolean>();

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
    this.menuToggled.emit(this.isCollapsed);
  }

}

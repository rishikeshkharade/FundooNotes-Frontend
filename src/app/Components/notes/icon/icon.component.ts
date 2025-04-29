import { Component, Input, Output, EventEmitter, HostListener } from '@angular/core';

interface MenuOption {
  label: string;
  icon: string;
  action: () => void;
}

@Component({
  selector: 'app-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss']
})
export class IconComponent {
  @Input() icon!: string;
  @Input() tooltip!: string;
  @Input() menuOptions: MenuOption[] = [];
  @Input() note: any; 

  @Output() iconClick = new EventEmitter<void>(); // when icon is clicked
  @Output() archiveChanged = new EventEmitter<void>(); 
  showMenu = false;

  @HostListener('document:click', ['$event'])
  clickOutside(event: Event): void {
    if (this.showMenu && !(event.target as HTMLElement).closest('.icon-button')) {
      this.showMenu = false;
    }
  }

  handleClick(event: Event): void {
    event.stopPropagation();

    if (this.menuOptions && this.menuOptions.length > 0) {
      // If there are menu options, open the menu
      this.showMenu = !this.showMenu;
    } else {
      // Otherwise, just emit the click
      this.iconClick.emit();
    }
  }

  handleMenuAction(action: () => void, event: Event): void {
    event.stopPropagation();
    this.showMenu = false;
    if (action) {
      action(); // Call the provided action
    }
  }
}

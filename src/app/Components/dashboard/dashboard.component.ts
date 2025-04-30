import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { ViewChild } from '@angular/core';
import { NotesComponent } from '../notes/notes/notes.component'; // Correct Path
import { SearchService } from 'src/app/Services/Search/search.service';
import { RefreshService } from 'src/app/Services/Refresh/refresh.service';
import { ViewModeService } from 'src/app/Services/ViewMode/view-mode.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
  
})
export class DashboardComponent {
  sidebarCollapsed = false;
  searchQuery: string = '';
  @ViewChild(NotesComponent) notesComponent!: NotesComponent;
  isRefreshing = false;
  isListView = false;
  showAccountMenu = false;
  currentRoute: string = '';


  constructor(private router: Router, private searchService: SearchService, private refreshService: RefreshService, private viewModeService: ViewModeService, private dialog: MatDialog) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = event.url;
      }
    });
  }

  ngOnInit() {
    if (window.innerWidth <= 768) {
      this.sidebarCollapsed = true;
    }
  }  

  // openLabelDialog() {
  //   this.dialog.open(LabelDialogComponent, {
  //     width: '400px'
  //   });
  // }

  toggleSidebar() {
    const sidebar = document.querySelector('.sidebar');
    if (window.innerWidth <= 768) {
      sidebar?.classList.toggle('show');
    } else {
      this.sidebarCollapsed = !this.sidebarCollapsed;
    }
  }

  onSidebarHover(hovered: boolean) {
    if (this.sidebarCollapsed) {
      const sidebar = document.querySelector('.sidebar');
      if (sidebar) {
        if (hovered) {
          sidebar.classList.add('hover-expand');
        } else {
          sidebar.classList.remove('hover-expand');
        }
      }
    }
  }
  
  

  isActive(path: string): boolean {
    return this.router.url === path;
  }

  onSearchChange() {
    this.searchService.updateSearch(this.searchQuery);
  }
  
  clearSearch() {
    this.searchQuery = '';
    this.searchService.updateSearch('');
  }

  refreshNotes() {
    this.isRefreshing = true; // Start rotation
  
    this.refreshService.triggerRefresh();
  
    // Simulate some delay (for smooth rotation feel)
    setTimeout(() => {
      this.isRefreshing = false; // Stop rotation after 1 sec
    }, 1000); 
  }

  toggleView() {
    this.isListView = !this.isListView;
    this.viewModeService.setViewMode(this.isListView);
  }

  toggleAccountMenu() {
    this.showAccountMenu = !this.showAccountMenu;
  }
  
  logout() {
    localStorage.removeItem('token'); // remove token
    this.router.navigate(['/login']); // redirect to login
  }

  getPageTitle(route: string): string {
    if (route.includes('archive')) return 'Archive';
    if (route.includes('trash')) return 'Trash';
    if (route.includes('reminders')) return 'Reminders';
    return 'Keep'; // fallback
  }
}

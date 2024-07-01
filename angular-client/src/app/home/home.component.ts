import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  FaIconLibrary,
  FontAwesomeModule,
} from '@fortawesome/angular-fontawesome';
import {
  faBirthdayCake,
  faEnvelope,
  faHome,
  faIdBadge,
  faPhone,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import { DataService } from '../data.service';
import { PaginationComponent } from './pagination/pagination.component';
import { TableComponent } from './table/table.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TableComponent,
    PaginationComponent,
    FontAwesomeModule,
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  allRecords: any[] = [];
  displayedRecords: any[] = [];
  sortColumn: string = '';
  sortDirection: 'asc' | 'desc' = 'asc';
  currentPage: number = 1;
  pageSize: number = 10;
  pageSizeOptions: number[] = [10, 20, 50, 100];
  searchTerm: string = '';
  icons: { [key: string]: any } = {};

  constructor(private dataService: DataService, library: FaIconLibrary) {
    library.addIcons(
      faUser,
      faEnvelope,
      faHome,
      faPhone,
      faIdBadge,
      faBirthdayCake
    );
    this.icons = {
      id: faIdBadge,
      name: faUser,
      age: faBirthdayCake,
      email: faEnvelope,
      address: faHome,
      phone: faPhone,
    };
  }

  ngOnInit(): void {
    this.dataService.getRecords().subscribe((data) => {
      this.allRecords = data;
      this.applyFilters();
    });
  }

  sort(column: string): void {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }
    this.applyFilters();
  }

  applyFilters(): void {
    let filteredRecords = this.allRecords;

    if (this.searchTerm) {
      filteredRecords = filteredRecords.filter((record) =>
        Object.values(record).some(
          (value) =>
            this.isSearchable(value) &&
            value
              .toString()
              .toLowerCase()
              .includes(this.searchTerm.toLowerCase())
        )
      );
    }

    if (this.sortColumn) {
      filteredRecords.sort((a, b) => {
        const comparison = this.compareValues(
          a[this.sortColumn],
          b[this.sortColumn]
        );
        return this.sortDirection === 'asc' ? comparison : -comparison;
      });
    }

    const startIndex = (this.currentPage - 1) * this.pageSize;
    this.displayedRecords = filteredRecords.slice(
      startIndex,
      startIndex + this.pageSize
    );
  }

  onSearch(searchTerm: string): void {
    this.searchTerm = searchTerm;
    this.currentPage = 1;
    this.applyFilters();
  }

  changePage(page: number): void {
    this.currentPage = page;
    this.applyFilters();
  }

  onPageSizeChange(newPageSize: number): void {
    this.pageSize = newPageSize;
    this.currentPage = 1;
    this.applyFilters();
  }

  get totalPages(): number {
    return Math.ceil(this.allRecords.length / this.pageSize);
  }

  private isSearchable(value: unknown): value is string | number | boolean {
    return (
      typeof value === 'string' ||
      typeof value === 'number' ||
      typeof value === 'boolean'
    );
  }

  private compareValues(a: any, b: any): number {
    if (typeof a === 'string' && typeof b === 'string') {
      return a.localeCompare(b);
    }
    if (a < b) return -1;
    if (a > b) return 1;
    return 0;
  }
  useCustomTemplate(record: any): boolean {
    return record.age >40;
  }
  showIcon(record: any, header: string): boolean {
    // Show age icon only for records with age > 40
    if (header === 'age') {
      return record.age > 40;
    }
    // Show email icon only for gmail addresses
    if (header === 'email') {
      return record.email.endsWith('@gmail.com');
    }
    if (header === 'phone') {
      return record.phone.startsWith('555');
    }
    if (header === 'address') {
      return record.address.includes('123');
    }
    if (header === 'name') {
      return record.name.startsWith('A');
    }
    if (header === 'id') {
      return record.id > 5;
    }
    // Show icons for all other fields
    return true;
  }
}

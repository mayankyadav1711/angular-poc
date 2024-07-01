import { CommonModule } from '@angular/common';
import { Component, ContentChild, EventEmitter, Input, Output, TemplateRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule, FormsModule, FontAwesomeModule],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent {
  @Input() records: any[] = [];
  @Input() headers: string[] = [];
  @Input() sortColumn: string = '';
  @Input() sortDirection: 'asc' | 'desc' = 'asc';
  @Input() icons: { [key: string]: any } = {};
  @Input() pageSizeOptions: number[] = [10, 25, 50, 100];
  @Input() useCustomTemplate!: (record: any) => boolean;
  @Input() showIcon!: (record: any, header: string) => boolean;
  @Output() sort = new EventEmitter<string>();
  @Output() search = new EventEmitter<string>();
  @Output() pageSizeChange = new EventEmitter<number>();

  @ContentChild('customRowTemplate') customRowTemplate!: TemplateRef<any>;

  searchTerm: string = '';
  selectedPageSize: number = 10;

  onSort(column: string): void {
    this.sort.emit(column);
  }

  onSearch(): void {
    this.search.emit(this.searchTerm);
  }

  onPageSizeChange(): void {
    this.pageSizeChange.emit(this.selectedPageSize);
  }
}
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SortOption } from '../../../core/models';
import { SORT_OPTIONS } from '../../../core/constants/sort-options';

@Component({
  selector: 'app-sort-dropdown',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sort-dropdown.component.html',
  styleUrls: []
})
export class SortDropdownComponent {
  @Input() options: SortOption[] = SORT_OPTIONS;
  @Input() value = 'default';
  @Output() valueChange = new EventEmitter<string>();

  onChange(event: Event) {
    const val = (event.target as HTMLSelectElement).value;
    this.valueChange.emit(val);
  }
}

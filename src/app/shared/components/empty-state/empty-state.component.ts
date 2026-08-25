import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-empty-state',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './empty-state.component.html',
  styleUrls: []
})
export class EmptyStateComponent {
  @Input() icon = 'bi-inbox';
  @Input() title = 'No data found';
  @Input() message = '';
  @Input() isError = false;
}

import { Component } from '@angular/core';
import { DataService } from '../../services/data/data.service';
import { ErrorService } from '../error.service';

@Component({
  selector: 'app-error',
  standalone: true,
  imports: [],
  templateUrl: './error.component.html',
  styleUrl: './error.component.scss',
})
export class ErrorComponent {
  constructor(public data: DataService, public error: ErrorService) {}
}

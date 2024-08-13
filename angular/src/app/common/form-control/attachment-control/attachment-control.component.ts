import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Optional,
  Output,
  Self,
} from '@angular/core';
import { Control } from '../form-control';
import { FormsModule, NgControl } from '@angular/forms';

@Component({
  selector: 'app-attachment-control',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './attachment-control.component.html',
  styleUrl: './attachment-control.component.scss',
})
export class AttachmentControlComponent extends Control implements OnInit {
  _file: string = '';

  @Input()
  set file(file: string) {
    this._file = file || '';
  }
  get file() {
    return this._file;
  }

  @Output('selectedFile') selectedFile: EventEmitter<any> = new EventEmitter();
  constructor(@Self() @Optional() public control: NgControl) {
    super();
    this.control && (this.control.valueAccessor = this);
    this.xControl = this.control;
  }

  ngOnInit(): void {}

  onSelect(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      const result = reader.result as string;
      this.selectedFile.emit(result);
    };

    reader.onerror = () => {
      console.log(reader.error);
    };

    reader.readAsDataURL(file);
  }

  fileClear() {
    this.selectedFile.emit('');
  }
}

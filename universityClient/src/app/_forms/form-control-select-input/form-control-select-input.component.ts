import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  Self,
} from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';

@Component({
  selector: 'app-form-control-select-input',
  templateUrl: './form-control-select-input.component.html',
  styleUrls: ['./form-control-select-input.component.css'],
})
export class FormControlSelectInputComponent implements ControlValueAccessor {
  @Input() options;
  @Input() label;
  @Output() selectChange: EventEmitter<Event> = new EventEmitter<Event>();

  constructor(@Self() public ngControl: NgControl) {
    this.ngControl.valueAccessor = this;
  }

  writeValue(obj: any): void {}
  registerOnChange(fn: any): void {}
  registerOnTouched(fn: any): void {}

  onSelectChange(event: Event) {
    this.selectChange.emit(event);
  }
}

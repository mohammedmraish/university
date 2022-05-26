import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-select-input',
  templateUrl: './select-input.component.html',
  styleUrls: ['./select-input.component.css'],
})
export class SelectInputComponent implements OnInit {
  @Input() options;
  @Input() label;
  @Input() value;
  @Output() selectChange: EventEmitter<Event> = new EventEmitter<Event>();

  constructor() {}

  ngOnInit(): void {}

  onSelectChange(event: Event) {
    this.selectChange.emit(event);
  }
}

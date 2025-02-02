import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-model-controls',
  standalone: true,
  templateUrl: './model-controls.component.html',
  styleUrls: ['./model-controls.component.scss']
})
export class ModelControlsComponent {
  // This output will emit a number when the user changes the scale.
  @Output() scaleChange = new EventEmitter<number>();

  // This method is called by the (input) binding in the template.
  onScaleChange(event: Event): void {
    const value = parseFloat((event.target as HTMLInputElement).value);
    this.scaleChange.emit(value);
  }
}

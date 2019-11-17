import { Component, Input } from '@angular/core';
import { SlComponent } from '../../../../model/model';
import { ViewportService } from '../viewport.service';

@Component({
  selector: '[slij-wire]',
  templateUrl: './wire.component.html',
  styleUrls: ['./wire.component.scss'],
})
export class WireComponent {
  @Input() startComponent: SlComponent;

  // which output on the start component that the wire connects to
  @Input() startIndex: number;
  @Input() endComponent: SlComponent;
  @Input() endIndex: number;

  constructor(readonly viewportService: ViewportService) {}
}

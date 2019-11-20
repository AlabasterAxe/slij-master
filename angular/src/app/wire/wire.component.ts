import { Component, Input, OnInit } from '@angular/core';
import { SlComponent, SlComponentType, Point } from '../../../../model/model';
import { ViewportService } from '../viewport.service';
import { Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: '[slij-wire]',
  templateUrl: './wire.component.html',
  styleUrls: ['./wire.component.scss'],
})
export class WireComponent implements OnInit {
  @Input() startComponent: SlComponent;

  // which output on the start component that the wire connects to
  @Input() startIndex: number;
  @Input() endComponent: SlComponent;
  @Input() endIndex: number;

  startLoc: Point;
  endLoc: Point;

  constructor(readonly viewportService: ViewportService) {}

  ngOnInit(): void {
    // this.startLoc = getOutputConnectorLoc(this.startComponent, this.startIndex);
    // this.endLoc = getInputConnectorLoc(this.endComponent, this.endIndex);
  }

  getLineWidth() {
    return Math.max(this.viewportService.zoom, 1);
  }
}

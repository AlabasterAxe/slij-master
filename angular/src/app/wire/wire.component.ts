import { Component, Input, OnInit } from '@angular/core';
import { SlComponent, SlComponentType, Point } from '../../../../model/model';
import { ViewportService } from '../viewport.service';
import { Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

function getInputConnectorLoc(component: SlComponent, inputConnectorId: number) {
  switch (component.TAG) {
    default:
      return { x: component.X, y: component.Y };
  }
}

function getOutputConnectorLoc(component: SlComponent, outputConnectorId: number) {
  switch (component.TAG) {
    case SlComponentType.ToggleButton:
    case SlComponentType.PulseButton:
      return { x: component.X + 40, y: component.Y + 16 };
    case SlComponentType.AndGate:
      return { x: component.X + 35, y: component.Y + 16 };
    default:
      return { x: component.X, y: component.Y };
  }
}

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

  startLoc: Observable<Point>;
  endLoc: Observable<Point>;
  locs: Observable<[Point, Point]>;

  constructor(readonly viewportService: ViewportService) {}

  ngOnInit(): void {
    this.startLoc = combineLatest(this.viewportService.getOffset(), this.viewportService.getZoomFactor()).pipe(
      map(([offset, zoom]) => {
        const untransformedLoc = getOutputConnectorLoc(this.startComponent, this.startIndex);
        return { x: (untransformedLoc.x + offset.x) * zoom, y: (untransformedLoc.y + offset.y) * zoom };
      }),
    );
    this.endLoc = combineLatest(this.viewportService.getOffset(), this.viewportService.getZoomFactor()).pipe(
      map(([offset, zoom]) => {
        const untransformedLoc = getInputConnectorLoc(this.endComponent, this.endIndex);
        return { x: (untransformedLoc.x + offset.x) * zoom, y: (untransformedLoc.y + offset.y) * zoom };
      }),
    );
    this.locs = combineLatest(this.startLoc, this.endLoc);
  }
}

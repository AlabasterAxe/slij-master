import { Component, OnInit, Input, AfterContentInit } from '@angular/core';
import { SlComponent } from '../../../../model/model';

@Component({
  selector: 'slij-wire',
  templateUrl: './wire.component.html',
  styleUrls: ['./wire.component.scss'],
})
export class WireComponent implements OnInit, AfterContentInit {
  @Input() startComponent: SlComponent;

  // which output on the start component that the wire connects to
  @Input() startIndex: number;
  @Input() endComponent: SlComponent;
  @Input() endIndex: number;
  @Input() offset: { x: number; y: number };
  @Input() zoom: number;

  svgLineStart: { x: number; y: number };
  svgLineEnd: { x: number; y: number };

  constructor() {}

  ngOnInit() {}

  ngAfterContentInit() {
    const xDelta = this.startComponent.X - this.endComponent.X;
    const yDelta = this.startComponent.Y - this.endComponent.Y;
    if (xDelta * yDelta > 0) {
      this.svgLineStart = { x: 0, y: 0 };
      this.svgLineEnd = { x: this.getSvgWidth(), y: this.getSvgHeight() };
    } else {
      this.svgLineStart = { x: 0, y: this.getSvgHeight() };
      this.svgLineEnd = { x: this.getSvgWidth(), y: 0 };
    }
  }

  getSvgWidth() {
    const startX = this.transformToPixelSpace({ x: this.startComponent.X, y: this.startComponent.Y }).x;
    const endX = this.transformToPixelSpace({ x: this.endComponent.X, y: this.endComponent.Y }).x;
    return Math.abs(startX - endX);
  }

  getSvgHeight() {
    const startY = this.transformToPixelSpace({ x: this.startComponent.X, y: this.startComponent.Y }).y;
    const endY = this.transformToPixelSpace({ x: this.endComponent.X, y: this.endComponent.Y }).y;
    return Math.abs(startY - endY);
  }

  getViewBox() {
    [0, 0, this.getSvgWidth(), this.getSvgHeight()].join(' ');
  }

  transformToPixelSpace(point: { x: number; y: number }) {
    return { x: (point.x + this.offset.x) * this.zoom, y: (point.y + this.offset.y) * this.zoom };
  }
}

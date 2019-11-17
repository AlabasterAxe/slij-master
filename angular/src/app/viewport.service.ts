import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

interface Point {
  x: number;
  y: number;
}

@Injectable({
  providedIn: 'root',
})
export class ViewportService {
  private readonly zoomInner = new BehaviorSubject(2);
  private zoomSync = 2;

  private readonly offsetInner = new BehaviorSubject({ x: 0, y: 0 });
  private offsetSync = { x: 0, y: 0 };

  get zoom() {
    return this.zoomSync;
  }

  set zoom(newZoom: number) {
    this.zoomSync = newZoom;
    this.zoomInner.next(newZoom);
  }

  get offset() {
    return this.offsetSync;
  }

  set offset(newOffset: Point) {
    this.offsetSync = newOffset;
    this.offsetInner.next(newOffset);
  }

  getZoomFactor(): Observable<number> {
    return this.zoomInner;
  }

  getOffset(): Observable<Point> {
    return this.offsetInner;
  }
}

import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { Point } from '../../../model/model';

@Injectable({
  providedIn: 'root',
})
export class ViewportService {
  private readonly zoomInner = new BehaviorSubject(10);
  private zoomSync = 10;

  private readonly offsetInner = new BehaviorSubject({ x: 300, y: 0 });
  private offsetSync: Point = { x: 300, y: 0 };

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

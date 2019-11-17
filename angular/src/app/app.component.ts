import { CdkDragEnd } from '@angular/cdk/drag-drop';
import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { SlijFile, SlComponent } from '../../../model/model';
import { ViewportService } from './viewport.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnDestroy {
  filename: File;
  data: SlijFile;
  connections: { startComponent: SlComponent; endComponent: SlComponent }[] = [];
  ticking = false;
  mouseloc = { x: 0, y: 0 };
  middleMouseButtonClickStart = { x: null, y: null };
  dragStartOffset = { x: null, y: null };

  componentMap = new Map<number, SlComponent>();

  fileUploadSubscription: Subscription;
  constructor(readonly viewportService: ViewportService) {
    window.addEventListener('wheel', e => {
      if (!this.ticking) {
        window.requestAnimationFrame(() => {
          this.ticking = false;
          viewportService.zoom *= e.deltaY > 0 ? 0.9 : 1.1;
        });

        this.ticking = true;
      }
    });
    window.addEventListener('mousedown', e => {
      if (!this.ticking) {
        window.requestAnimationFrame(() => {
          this.ticking = false;
          if (e.which === 2) {
            this.middleMouseButtonClickStart = { x: e.clientX, y: e.clientY };
            this.dragStartOffset = { x: viewportService.offset.x, y: viewportService.offset.y };
          }
        });

        this.ticking = true;
      }
    });
    window.addEventListener('mousemove', e => {
      if (!this.ticking) {
        window.requestAnimationFrame(() => {
          this.ticking = false;
          this.mouseloc.x = e.clientX;
          this.mouseloc.y = e.clientY;
          if (e.which === 2) {
            viewportService.offset = {
              x: this.dragStartOffset.x + (e.clientX - this.middleMouseButtonClickStart.x) / viewportService.zoom,
              y: this.dragStartOffset.y + (e.clientY - this.middleMouseButtonClickStart.y) / viewportService.zoom,
            };
          }
        });

        this.ticking = true;
      }
    });
  }

  ngOnDestroy(): void {
    if (this.fileUploadSubscription) {
      this.fileUploadSubscription.unsubscribe();
    }
  }

  handleFileInput(arg: FileList) {
    this.filename = arg.item(0);
    const filereader = new FileReader();
    filereader.onload = evt => {
      const event: any = evt;
      this.data = JSON.parse(event.target.result);
      for (const component of this.data.COMPONENTS) {
        this.componentMap.set(component.ID, component);
      }
      for (const component of this.data.COMPONENTS) {
        for (const input of component.INPUTS) {
          this.connections.push({
            startComponent: this.componentMap.get(input.OTHER_COMPONENT),
            endComponent: component,
          });
        }
      }
    };
    filereader.readAsText(arg.item(0));
  }

  pinchToZoom(event) {
    console.log(event);
  }

  droppedComponent(event: CdkDragEnd, component: any) {
    component.X += event.distance.x / this.viewportService.zoom;
    component.Y += event.distance.y / this.viewportService.zoom;
    event.source.reset();
  }

  getTempWireWidth() {
    return Math.abs(this.data.COMPONENTS[0].X - this.data.COMPONENTS[1].X);
  }

  getTop() {
    return Math.min(this.data.COMPONENTS[0].Y, this.data.COMPONENTS[1].Y);
  }

  getLeft() {
    return Math.min(this.data.COMPONENTS[0].X, this.data.COMPONENTS[1].X);
  }
}

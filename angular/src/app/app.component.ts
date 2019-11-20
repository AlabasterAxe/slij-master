import { CdkDragEnd } from '@angular/cdk/drag-drop';
import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { SlijFile, SlComponent, SlComponentType, Point, Slijet } from '../../../model/model';
import { ViewportService } from './viewport.service';
import * as data from '../../../data/1-bit-adder.json';

function getInputConnectorLoc(component: SlComponent, inputConnectorId: number) {
  switch (component.TAG) {
    case SlComponentType.IntegratedCircuit:
      return { x: component.X - 10, y: component.Y + 40 * inputConnectorId };
    default:
      return { x: component.X, y: component.Y };
  }
}

function getOutputConnectorLoc(component: SlComponent, outputConnectorId: number) {
  switch (component.TAG) {
    case SlComponentType.IntegratedCircuit:
      return { x: component.X + 41.5, y: component.Y + 12.5 * outputConnectorId + 7 };
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
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnDestroy {
  filename: File;
  data: SlijFile;
  connections: { startComponent: SlComponent; startOffset: Point; endComponent: SlComponent; endOffset: Point }[] = [];
  ticking = false;
  mouseloc = { x: 0, y: 0 };
  middleMouseButtonClickStart = { x: null, y: null };
  dragStartOffset = { x: null, y: null };

  componentMap = new Map<number, SlComponent>();

  fileUploadSubscription: Subscription;
  constructor(readonly viewportService: ViewportService) {
    // this.data = (data as any).default;
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

  getViewportTranslation(): string {
    const scaleValue = this.viewportService.zoom / 4;
    const translateX = this.viewportService.offset.x;
    const translateY = this.viewportService.offset.y;
    return `translate(${translateX}, ${translateY}) scale(${scaleValue})`;
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
          const sc = this.componentMap.get(input.OTHER_COMPONENT);
          this.connections.push({
            startComponent: sc,
            startOffset:
              sc.TAG === SlComponentType.ToggleButton
                ? Slijet.build(sc).getOutputLoc(input.OTHER_CONNECTOR_ID)
                : { x: 0, y: 0 },
            endComponent: component,
            endOffset: { x: 0, y: 0 },
          });
        }
      }
    };
    filereader.readAsText(arg.item(0));
  }

  pinchToZoom(event) {
    console.log(event);
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

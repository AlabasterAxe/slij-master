import { Component, OnInit, Input } from '@angular/core';
import { SlComponent, SlComponentType, Slijet } from '../../../../model/model';
import { ViewportService } from '../viewport.service';
import { CdkDragEnd } from '@angular/cdk/drag-drop';

@Component({
  selector: '[slij-component]',
  templateUrl: './component.component.html',
  styleUrls: ['./component.component.scss'],
})
export class ComponentComponent implements OnInit {
  @Input() component: SlComponent;

  SlComponentType = SlComponentType;
  Slijet = Slijet;

  constructor(private readonly viewportService: ViewportService) {}

  ngOnInit() {}

  getViewportTranslation(): string {
    return `translate(${this.component.X}, ${this.component.Y})`;
  }

  droppedComponent(event: CdkDragEnd, component: any) {
    component.X += event.distance.x / this.viewportService.zoom;
    component.Y += event.distance.y / this.viewportService.zoom;
    event.source.reset();
  }
}

import { Component, OnInit, Input } from '@angular/core';
import { SlComponent, SlComponentType } from '../../../../model/model';
import { ViewportService } from '../viewport.service';

@Component({
  selector: '[slij-component]',
  templateUrl: './component.component.html',
  styleUrls: ['./component.component.scss'],
})
export class ComponentComponent implements OnInit {
  @Input() component: SlComponent;

  SlComponentType = SlComponentType;

  constructor(private readonly viewportService: ViewportService) {}

  ngOnInit() {}

  getViewportTranslation(): string {
    const scaleValue = this.viewportService.zoom / 4;
    const translateX = (this.component.X + this.viewportService.offset.x) * this.viewportService.zoom;
    const translateY = (this.component.Y + this.viewportService.offset.y) * this.viewportService.zoom;
    return `translate(${translateX}, ${translateY}) scale(${scaleValue})`;
  }
}

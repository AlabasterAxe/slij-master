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

  constructor(readonly viewportService: ViewportService) {}

  ngOnInit() {}
}

import { Component, OnInit, Input } from '@angular/core';
import { SlComponent, SlComponentType } from '../../../../../model/model';

@Component({
  selector: 'slij-gate',
  templateUrl: './gate.component.html',
  styleUrls: ['./gate.component.scss'],
})
export class GateComponent implements OnInit {
  @Input() component: SlComponent;

  SlComponentType = SlComponentType;

  constructor() {}

  ngOnInit() {}
}

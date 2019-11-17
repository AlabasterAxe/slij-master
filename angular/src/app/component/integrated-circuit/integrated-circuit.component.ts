import { Component, OnInit, Input } from '@angular/core';
import { SlComponent } from '../../../../../model/model';

@Component({
  selector: '[slij-integrated-circuit]',
  templateUrl: './integrated-circuit.component.html',
  styleUrls: ['./integrated-circuit.component.scss'],
})
export class IntegratedCircuitComponent implements OnInit {
  @Input() component: SlComponent;

  constructor() {}

  ngOnInit() {}

  getHeight() {
    return Math.max(this.component.ARGUMENTS.NUM_OF_IN, this.component.ARGUMENTS.NUM_OF_OUT) * 50;
  }

  getViewBoxHeight() {
    return Math.max(this.component.ARGUMENTS.NUM_OF_IN, this.component.ARGUMENTS.NUM_OF_OUT) * 75;
  }

  outputs() {
    return Array(this.component.ARGUMENTS.NUM_OF_OUT);
  }

  inputs() {
    return Array(this.component.ARGUMENTS.NUM_OF_IN);
  }
}

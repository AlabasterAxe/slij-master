import { Component, OnInit, Input } from '@angular/core';
import { SlComponent, SlComponentType } from '../../../../../model/model';

@Component({
  selector: '[slij-push-button]',
  templateUrl: './push-button.component.html',
  styleUrls: ['./push-button.component.scss'],
})
export class PushButtonComponent implements OnInit {
  @Input() component: SlComponent;
  SlComponentType = SlComponentType;
  constructor() {}

  ngOnInit() {}
}

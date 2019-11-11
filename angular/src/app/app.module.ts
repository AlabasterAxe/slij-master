import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ComponentComponent } from './component/component.component';
import { PushButtonComponent } from './component/push-button/push-button.component';
import { GateComponent } from './component/gate/gate.component';
import { IntegratedCircuitComponent } from './component/integrated-circuit/integrated-circuit.component';

@NgModule({
  declarations: [AppComponent, ComponentComponent, PushButtonComponent, GateComponent, IntegratedCircuitComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    DragDropModule,
    MatTooltipModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

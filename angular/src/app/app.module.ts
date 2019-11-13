import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { DragDropModule } from "@angular/cdk/drag-drop";
import { MatTooltipModule } from "@angular/material/tooltip";
import { ComponentComponent } from "./component/component.component";
import { PushButtonComponent } from "./component/push-button/push-button.component";
import { GateComponent } from "./component/gate/gate.component";
import { IntegratedCircuitComponent } from "./component/integrated-circuit/integrated-circuit.component";
import { TerminalComponent } from "./component/terminal/terminal.component";
import { AndComponent } from "./component/gate/and/and.component";
import { NandComponent } from "./component/gate/nand/nand.component";
import { OrComponent } from "./component/gate/or/or.component";
import { NorComponent } from "./component/gate/nor/nor.component";
import { BufferComponent } from "./component/gate/buffer/buffer.component";
import { NotComponent } from "./component/gate/not/not.component";
import { XorComponent } from "./component/gate/xor/xor.component";
import { XnorComponent } from "./component/gate/xnor/xnor.component";
import { WireComponent } from './wire/wire.component';

@NgModule({
  declarations: [
    AppComponent,
    ComponentComponent,
    PushButtonComponent,
    GateComponent,
    IntegratedCircuitComponent,
    TerminalComponent,
    AndComponent,
    NandComponent,
    OrComponent,
    NorComponent,
    BufferComponent,
    NotComponent,
    XorComponent,
    XnorComponent,
    WireComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    DragDropModule,
    MatTooltipModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}

import { CdkDragEnd } from "@angular/cdk/drag-drop";
import { Component, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";
import { SlijFile } from "../../../model/model";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnDestroy {
  title = "slij-master";
  filename: File;
  data: SlijFile;
  zoom = 2;
  ticking = false;
  offset = { x: 0, y: 0 };
  mouseloc = { x: 0, y: 0 };
  middleMouseButtonClickStart = { x: null, y: null };
  dragStartOffset = { x: null, y: null };

  fileUploadSubscription: Subscription;
  constructor() {
    window.addEventListener("wheel", e => {
      if (!this.ticking) {
        window.requestAnimationFrame(() => {
          this.ticking = false;
          this.zoom *= e.deltaY > 0 ? 0.9 : 1.1;
        });

        this.ticking = true;
      }
    });
    window.addEventListener("mousedown", e => {
      if (!this.ticking) {
        window.requestAnimationFrame(() => {
          this.ticking = false;
          if (e.which === 2) {
            this.middleMouseButtonClickStart = { x: e.clientX, y: e.clientY };
            this.dragStartOffset = { x: this.offset.x, y: this.offset.y };
          }
        });

        this.ticking = true;
      }
    });
    window.addEventListener("mousemove", e => {
      if (!this.ticking) {
        window.requestAnimationFrame(() => {
          this.ticking = false;
          this.mouseloc.x = e.clientX;
          this.mouseloc.y = e.clientY;
          if (e.which === 2) {
            this.offset.x =
              this.dragStartOffset.x +
              (e.clientX - this.middleMouseButtonClickStart.x) / this.zoom;
            this.offset.y =
              this.dragStartOffset.y +
              (e.clientY - this.middleMouseButtonClickStart.y) / this.zoom;
          }
        });

        this.ticking = true;
      }
    });
    window.addEventListener("mouseup", e => {
      if (!this.ticking) {
        window.requestAnimationFrame(() => {
          this.ticking = false;
          // lock in move
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
    };
    filereader.readAsText(arg.item(0));
  }

  droppedComponent(event: CdkDragEnd, component: any) {
    console.log(event);
    component.X += event.distance.x / this.zoom;
    component.Y += event.distance.y / this.zoom;
    event.source.reset();
  }
}

import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { CourseItemComponent } from "./course-item.component";

@NgModule({
    declarations: [
        CourseItemComponent
    ],
    imports: [
      CommonModule,
    ],
    exports: [
        CourseItemComponent
    ]
  })
  export class CourseItemModule { }
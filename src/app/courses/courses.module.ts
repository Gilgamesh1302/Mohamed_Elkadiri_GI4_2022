import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CoursesPageRoutingModule } from './courses-routing.module';

import { CoursesPage } from './courses.page';
import { CourseItemComponent } from '../course-item/course-item.component';
import { CourseItemModule } from '../course-item/course-item.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CourseItemModule,
    CoursesPageRoutingModule
  ],
  declarations: [
      CoursesPage,
    ]
})
export class CoursesPageModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EnrolledCoursesPageRoutingModule } from './enrolled-courses-routing.module';

import { EnrolledCoursesPage } from './enrolled-courses.page';
import { CourseItemComponent } from '../course-item/course-item.component';
import { CourseItemModule } from '../course-item/course-item.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CourseItemModule,
    EnrolledCoursesPageRoutingModule
  ],
  declarations: [
      EnrolledCoursesPage,
    ]
})
export class EnrolledCoursesPageModule {}

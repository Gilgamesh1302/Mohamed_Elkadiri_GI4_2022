import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardPage } from './dashboard.page';
const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardPage,
    children: [
        {
            path: 'courses',
            loadChildren: () => import('../courses/courses.module').then(c => c.CoursesPageModule),
        },
        {
            path: 'enrolled-courses',
            loadChildren: () => import('../enrolled-courses/enrolled-courses.module').then(e => e.EnrolledCoursesPageModule),
        },
        {
            path: 'add-course',
            loadChildren: () => import('../add-course/add-course.module').then(a => a.AddCoursePageModule)
        }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardPageRoutingModule {}

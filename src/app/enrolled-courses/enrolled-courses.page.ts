import { Component, OnInit } from '@angular/core';
import { CoursesService } from '../services/CoursesService';

@Component({
  selector: 'app-enrolled-courses',
  templateUrl: './enrolled-courses.page.html',
  styleUrls: ['./enrolled-courses.page.scss'],
})
export class EnrolledCoursesPage implements OnInit {

    enrolledCourses: Array<Object> = [];
    constructor(
        private coursesService: CoursesService,
    ) { }

    async ngOnInit() {
        (await this.coursesService.getEnrolledCourses()).subscribe(res => {
            this.enrolledCourses = []
            res.forEach(course => {
                this.coursesService.getCourseById(course.key)
                    .then(result => this.enrolledCourses.push(result));
            })
        })
    }

}

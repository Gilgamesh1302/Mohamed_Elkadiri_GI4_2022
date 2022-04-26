import { Component, OnInit } from '@angular/core';
import { CoursesService } from '../services/CoursesService';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.page.html',
  styleUrls: ['./courses.page.scss'],
})
export class CoursesPage implements OnInit {

    coursesList: Array<Object> = [];

  constructor(
      private courseService: CoursesService,
  ) { }

  async ngOnInit() {
      const snapshot = await this.courseService.getAllCourses();
      snapshot.subscribe(res => {
        this.coursesList = []
        res.forEach(course => {
            this.courseService.getCourseById(course.key)
                .then(result => this.coursesList.push(result));
        })
      })
    }

}

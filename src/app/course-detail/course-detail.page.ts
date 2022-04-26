import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AuthenticationService } from '../services/AuthenticationService';
import { CoursesService } from '../services/CoursesService';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.page.html',
  styleUrls: ['./course-detail.page.scss'],
})
export class CourseDetailPage implements OnInit {

    courseItem: any;
    imageUrl: string;
    isEnrolled: boolean;
    courseId: string;
    isUserAdmin: boolean;

  constructor(
      private route: ActivatedRoute,
      private authService: AuthenticationService,
      private courseService: CoursesService,
      private router: Router,
      private toastController: ToastController,
  ) {
      this.route.params.subscribe(params => {
          this.courseId = params["courseId"]
      });
  }

  async ngOnInit() {
        this.isUserAdmin = await this.authService.isAdmin();
        this.courseService.isEnrolledInCourse()
            .subscribe(response => {
                this.isEnrolled = false;
                response.forEach(item => {
                    if (item.key === this.courseId)
                        this.isEnrolled = true;
                })
            });
        this.courseItem = await this.courseService.getCourseById(this.courseId);
        this.imageUrl = await this.courseService.getImage(this.courseItem.image);
  }
  displayToast(message: string) {
    this.toastController.create({
        message,
        position: 'bottom',
        duration: 1500,
    }).then(toast => {
        toast.present();
    })
    }

    enrollInCourse() {
      this.courseService.enrollInCourse(this.authService.getCurrentUser().uid, this.courseId)
        .then(() => {
            this.displayToast(`You enrolled in ${this.courseItem.name} course successfully`);
        });
    }

    cancelEnrollment() {
      this.courseService.cancelEnrollement(this.courseItem.id)
        .then(() => {
            this.displayToast(`you are no longer enrolled in ${this.courseItem.name} course`);
        })
        .catch(() => {
            this.displayToast("An error occurred, please try again");
        })
    }

    removeCourse() {
        const name = this.courseItem.name
        this.courseService.removeCourse(this.courseItem.id)
            .then(() => {
                this.displayToast(`${name} removed successfully`)
                this.router.navigateByUrl('dashboard/courses', { replaceUrl: true })
            })
            .catch(() => this.displayToast('an error occurred, please try again'));
    }

}

import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AuthenticationService } from '../services/AuthenticationService';
import { CoursesService } from '../services/CoursesService';

@Component({
  selector: 'app-course-item',
  templateUrl: './course-item.component.html',
  styleUrls: ['./course-item.component.scss'],
})
export class CourseItemComponent implements OnInit {


    @Input()
    courseItem: any;
    @ViewChild('b')
    buttonRef: ElementRef;
    imageUrl: string;
    isUserAdmin: boolean;
    isEnrolled: boolean;
  constructor(
      private authService: AuthenticationService,
      private toastController: ToastController,
      private router: Router,
      private coursesService: CoursesService,
  ) { }

  async ngOnInit() {
      this.isUserAdmin = await this.authService.isAdmin();
      this.imageUrl = await this.coursesService.getImage(this.courseItem.image);
      const snapshot = await this.coursesService.isEnrolledInCourse();
      snapshot.subscribe(response => {
          this.isEnrolled = false;
          response.forEach(item => {
              if (item.key === this.courseItem.id)
                this.isEnrolled = true;
          })
      })
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
      this.coursesService.enrollInCourse(this.authService.getCurrentUser().uid, this.courseItem.id)
        .then(() => {
            this.displayToast(`You enrolled in ${this.courseItem.name} course successfully`);
        });
    }

    cancelEnrollment() {
      this.coursesService.cancelEnrollement(this.courseItem.id)
        .then(() => {
            this.displayToast(`you are no longer enrolled in ${this.courseItem.name} course`);
        })
        .catch(() => {
            this.displayToast("An error occurred, please try again");
        })
    }

    showDetail(event) {
        if (this.buttonRef.nativeElement.contains(event.target)) return;
        this.router.navigateByUrl(`courses/${this.courseItem.id}`, { replaceUrl: true })
    }

    removeCourse() {
        const name = this.courseItem.name
        this.coursesService.removeCourse(this.courseItem.id)
            .then(() => this.displayToast(`${name} removed successfully`))
            .catch(() => this.displayToast('an error occurred, please try again'));
    }

}

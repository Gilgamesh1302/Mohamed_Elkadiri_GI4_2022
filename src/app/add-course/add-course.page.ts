import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AuthenticationService } from '../services/AuthenticationService';
import { CoursesService } from '../services/CoursesService';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.page.html',
  styleUrls: ['./add-course.page.scss'],
})
export class AddCoursePage implements OnInit {

    addCourseForm: FormGroup;
    isUserAdmin: boolean;
  constructor(
      private router: Router,
      private courseService: CoursesService,
      private toastController: ToastController,
      private formBuilder: FormBuilder,
      private authService: AuthenticationService
  ) {
    this.addCourseForm = this.formBuilder.group({
        name: ['', Validators.required],
        date: ['', Validators.required],
        price: ['', Validators.required],
        description: ['', Validators.required],
        image: ['', Validators.required],
        imageSource: ['', Validators.required],
    })
  }

  async ngOnInit() {
      this.isUserAdmin = await this.authService.isAdmin();
      if (!this.isUserAdmin) this.router.navigateByUrl('/dashboard/courses', { replaceUrl: true });
  }

  onFileChange(event) {
  
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.addCourseForm.patchValue({
        imageSource: file
      });
    }
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

  async addCourseToFirebase() {
      const imageName = await this.courseService.uploadImage(this.addCourseForm.get('imageSource').value, this.addCourseForm.get('name').value);
      const course = {
          name: this.addCourseForm.get('name').value,
          date: this.addCourseForm.get('date').value,
          price: this.addCourseForm.get('price').value,
          description: this.addCourseForm.get('description').value,
          image: imageName,
      }
      this.courseService.addCourse(course).then(res => {
          this.displayToast(`${course.name} added successfully`)
      }).catch(err => {
          this.displayToast('an error occured, please try again')
      });
  }

}

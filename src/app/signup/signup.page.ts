import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import User from '../models/user.model';
import { AuthenticationService } from '../services/AuthenticationService';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

    signupForm: FormGroup;
    userData: User;

    constructor(
        private fb: FormBuilder,
        private toastController: ToastController,
        private authService: AuthenticationService,
        private router: Router
    ) {}

    ngOnInit() {
        this.signupForm = this.fb.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(8)]],
            confirmPassword: ['', [Validators.required, Validators.minLength(8)]]
        }, { validators: this.passwordMatchingValidatior });
    }

    passwordMatchingValidatior(control: AbstractControl): ValidationErrors | null  {
        const password = control.get('password');
        const confirmPassword = control.get('confirmPassword');
      
        return password?.value === confirmPassword?.value ? null : { noMatch: true };
    }

    buildUser() {
        this.userData = {
            firstName: this.signupForm.get('firstName').value,
            lastName: this.signupForm.get('lastName').value,
            email: this.signupForm.get('email').value,
            password: this.signupForm.get('password').value
        }
    }

    displayToast(message: string) {
        this.toastController.create({
            header: "Success !!",
            message,
            position: 'bottom',
            duration: 1500,
        }).then(toast => {
            toast.present();
        })
    }

    signUpUser(): void {
        this.buildUser();
        console.log(this.userData);
        this.authService.registerUser(this.userData)
            .then(userCredentials => {
                this.userData.uid = userCredentials.user.uid;
                this.authService.setUserData(this.userData);
                this.displayToast("registred sucessfully, please login")
                this.router.navigateByUrl('/login', { replaceUrl: true });
                
            })
            .catch(err => {
                console.log(err);
            })
    }

}

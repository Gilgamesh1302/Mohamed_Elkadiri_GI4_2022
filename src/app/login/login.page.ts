import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import User from '../models/user.model';
import { AuthenticationService } from '../services/AuthenticationService';

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

    email: string;
    password: string;
    loginForm: FormGroup;

    constructor(
        private fireAuth: AngularFireAuth,
        private fb: FormBuilder,
        private authService: AuthenticationService,
        private router: Router,
        private toastController: ToastController,
    ) { }

    ngOnInit(): void {
        this.loginForm = this.fb.group({
            email: ['', Validators.required],
            password: ['', Validators.required]
        })
    }

    setData() {
        this.email = this.loginForm.get('email').value;
        this.password = this.loginForm.get('password').value;
    }

    displayToast(message: string) {
        this.toastController.create({
            header: "Opps !!",
            message,
            position: 'bottom',
            duration: 1500,
        }).then(toast => {
            toast.present();
        })
    }

    loginUser() {
        this.setData();
        this.authService.signIn(this.email, this.password)
            .then((user) => {
                localStorage.setItem('user', JSON.stringify(user.user));
                this.router.navigateByUrl('/dashboard/courses', { replaceUrl: true })
            })
            .catch(() => {
                this.displayToast("email or password incorrect, please try again");
            });
    }

}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AuthenticationService } from '../services/AuthenticationService';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

    isUserAdmin: boolean;

  constructor(
      private authService: AuthenticationService,
      private router: Router,
      private toastController: ToastController,
  ) { }

  async ngOnInit() {
      this.authService.redirectToHomeWhenLoggedOut();
      this.isUserAdmin = await this.authService.isAdmin();
      console.log(this.isUserAdmin);
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

  signOut() {
      this.authService.logOut()
        .then(() => this.router.navigateByUrl('/login', { replaceUrl: true }))
        .catch(() => this.displayToast("An Error Occured, please try again"));
  }

}

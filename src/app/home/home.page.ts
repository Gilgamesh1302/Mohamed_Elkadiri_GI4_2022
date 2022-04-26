import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import User from '../models/user.model';
import { AuthenticationService } from '../services/AuthenticationService';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  constructor(
      private router: Router,
  ) {}

  ngOnInit(): void {
      if(JSON.parse(localStorage.getItem('user'))) {
          this.router.navigateByUrl('/dashboard/courses', { replaceUrl: true });
      } else {
          this.router.navigateByUrl('/login', { replaceUrl: true })
      }
  }

}

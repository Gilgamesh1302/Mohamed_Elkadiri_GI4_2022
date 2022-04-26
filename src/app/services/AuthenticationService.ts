import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { AngularFireDatabase } from "@angular/fire/compat/database";
import { Router } from "@angular/router";
import User from "../models/user.model";

@Injectable({
    providedIn: 'root',
})
export class AuthenticationService {
    currentUser: any;
    constructor(
        public fireAuth: AngularFireAuth,
        public database: AngularFireDatabase,
        public router: Router,
    ) {
        this.fireAuth.authState.subscribe(user => {
            if (user) {
                this.currentUser = user;
                localStorage.setItem('user', JSON.stringify(this.currentUser));
            } else {
                this.currentUser = null;
                localStorage.setItem('user', null);
            }
        })
    }
    
    redirectToHomeWhenLoggedOut() {
        if (!JSON.parse(localStorage.getItem('user')))
            this.router.navigateByUrl('/login', { replaceUrl: true });
    }

    signIn(email: string, password: string): Promise<any> {
        return this.fireAuth.signInWithEmailAndPassword(email, password);
    }

    setUserData(user) {
        const userData: User = {
            firstName: user.firstName,
            lastName: user.lastName,
            isAdmin: false,
            email: user.email,
        }
        this.database.database.ref(`users/${user.uid}`).set(userData);
    }

    registerUser(user) {
        return this.fireAuth.createUserWithEmailAndPassword(user.email, user.password);
    }

    getCurrentUser() {
        return JSON.parse(localStorage.getItem('user'));
    }

    async isAdmin() {
        const userId = this.getCurrentUser().uid;
        const user = await this.database.database.ref(`users/${userId}/isAdmin`).get();
        return user.val();
    }

    logOut() {
        return this.fireAuth.signOut().then(() => {
            localStorage.removeItem('user');
        });
    }
}
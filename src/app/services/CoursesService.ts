import { Injectable } from "@angular/core";
import { AngularFireDatabase } from "@angular/fire/compat/database";
import { AngularFireStorage } from "@angular/fire/compat/storage";
import { AuthenticationService } from "./AuthenticationService";

@Injectable({
    providedIn: 'root'
})

export class CoursesService {
    constructor(
        private authService: AuthenticationService,
        private database: AngularFireDatabase,
        private storage: AngularFireStorage,
    ) {}

    async getAllCourses() {
        const snapshot = await this.database.list('courses').snapshotChanges();
        return snapshot;
    }

    async getImage(imageName) {
        return this.storage.storage.ref(`/courses/${imageName}`).getDownloadURL();
    }

    enrollInCourse(userId, courseId) {
        return this.database.database.ref(`users/${userId}/enrolledIn/${courseId}`).set(true);
    }

    isEnrolledInCourse() {
        const userId = this.authService.getCurrentUser().uid;
        return this.database.list(`users/${userId}/enrolledIn`).snapshotChanges();
    }

    async getCourseById(courseId) {
        const snapshot = this.database.database.ref(`courses/${courseId}`).get();
        const id = (await (snapshot)).key
        return { id, ...(await snapshot).val() }
    }

    cancelEnrollement(courseId) {
        const userId = this.authService.getCurrentUser().uid;
        return this.database.database.ref(`users/${userId}/enrolledIn/${courseId}`).remove();
    }

    async getEnrolledCourses() {
        const userId = this.authService.getCurrentUser().uid;
        const snapshot = await this.database.list(`users/${userId}/enrolledIn`).snapshotChanges();
        return snapshot;
    }

    async uploadImage(file, courseName) {
        const splitName = file.name.split('.')
        const newName = `${courseName}.${splitName[splitName.length - 1]}`;
        if (!!file) {
            const result = await this.storage.ref('courses').child(newName).put(file);
            return result.metadata.name;
        }
    }

    async addCourse(course) {
        return this.database.database.ref('courses').push().set(course);
    }

    async removeCourse(courseId) {
        const users = await this.database.database.ref('users').get();
        users.forEach(user => {
            if (user.val().enrolledIn) {
                this.database.database.ref(`users/${user.key}/enrolledIn/${courseId}`).remove()
                    .then(() => console.log('enrolled In removed'));
            }
        })
        return this.database.database.ref(`courses/${courseId}`).remove();
    }
}

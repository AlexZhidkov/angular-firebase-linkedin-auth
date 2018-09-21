import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  items: Observable<any[]>;
  title = 'ChrisDemo';

  constructor(db: AngularFirestore) {
    this.items = db.collection('students').valueChanges();
  }

  loginWithLinkedIn() {
    // ToDo: log in with LinkedIn here and get the signed-In user information.
    window.location.href = 'https://us-central1-chris-students-demo.cloudfunctions.net/redirect';
  }
}

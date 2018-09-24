import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { of } from 'rxjs';

declare var IN: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  items: Observable<any[]>;
  title = 'ChrisDemo';

  constructor( db: AngularFirestore ) {
    this.items = db.collection('students').valueChanges();
  }

  loginWithLinkedIn() {
    // ToDo: log in with LinkedIn here and get the signed-In user information.
    // window.location.href = 'https://us-central1-internship-poc.cloudfunctions.net/redirect';
    IN.User.authorize(() => this.onLoggedIN());
  }

  async onLoggedIN() {
    IN.API.Profile('me')
      .fields('firstName', 'lastName', 'location', 'positions')
      .result((profile) => {
        this.items = of(profile.values);
      })
      .error((err) => {
        console.log(err);
      });
  }
}

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
  linkedinProfile: Observable<any[]>;
  title = 'ChrisDemo';

  constructor(db: AngularFirestore) {
    // this.items = db.collection('students').valueChanges();
  }

  loginWithLinkedIn() {
    IN.User.authorize(() => this.onLoggedIN());
  }

  async onLoggedIN() {
    IN.API.Profile('me')
      .fields('firstName', 'lastName', 'email-address', 'picture-url', 'location', 'positions')
      .result((profile) => {
        this.linkedinProfile = of(profile.values);
      })
      .error((err) => {
        console.log(err);
      });
  }
}

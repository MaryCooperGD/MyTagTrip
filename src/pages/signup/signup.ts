import { Component } from '@angular/core';
import { NavController, ToastController, MenuController } from 'ionic-angular';

import { MainPage } from '../../pages/pages';
import { TagTripPage } from '../tagtrip/tagtrip';
import { User } from '../../providers/user';
import { Api } from '../../providers/api';
import { Observable } from 'rxjs/Observable';

import { TranslateService } from '@ngx-translate/core';
import { AngularFireDatabaseModule, AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';


@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {
  // The account fields for the login form.
  // If you're using the username field with or without email, make
  // sure to add it to the type
  account: { name: string, email: string, password: string } = {
    name: 'Test Human',
    email: 'test@example.com',
    password: 'test'
  };

  // Our translated text strings
  private signupErrorString: string;

  constructor(public navCtrl: NavController,
    public user: User,
    public toastCtrl: ToastController,
    public translateService: TranslateService,
    public api : Api,
    public menuCtrl: MenuController) {

   this.menuCtrl.enable(false);
  }

  doSignup() {
    // Attempt to login in through our User service
    var result : any = this.api.doSignUp(this.account.email, this.account.password,this.account.name);
    let res = Observable.fromPromise(result);
    res.subscribe(res => {
      if (res instanceof Error){
        this.displayLoginError(res)
      } else {
          this.navCtrl.push(TagTripPage);

      }
    })
  }

  displayLoginError(err :Error){
    let toast = this.toastCtrl.create({
      message: err.message,
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }
}

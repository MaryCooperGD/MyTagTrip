import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';

import { MainPage } from '../../pages/pages';
import { MapPage } from '../map/map';

import { User } from '../../providers/user';
import { Api } from '../../providers/api';

import { TranslateService } from '@ngx-translate/core';

import { AngularFireDatabaseModule, AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';



@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  // The account fields for the login form.
  // If you're using the username field with or without email, make
  // sure to add it to the type
  account: { email: string, password: string } = {
    email: 'test@example.com',
    password: 'test'
  };

  user: Observable<firebase.User>;

email: any;
password:any;
  // Our translated text strings
  private loginErrorString: string;

  constructor(public navCtrl: NavController,
    public toastCtrl: ToastController,
    public translateService: TranslateService,
    public api : Api) {

    this.translateService.get('LOGIN_ERROR').subscribe((value) => {
      this.loginErrorString = value;
    });
  }

  // Attempt to login in through our User service
  doLogin() {
    var result :any = this.api.doLogin();
    let res = Observable.fromPromise(result);
    res.subscribe(res => {
      if (res instanceof Error){
        this.displayLoginError(res)
      } else {
          this.navCtrl.push(MainPage);
      }
    })


  }

  doEmailPswLogin(){
    var result : any = this.api.doEmailPswLogin(this.email, this.password);
    let res = Observable.fromPromise(result);
    res.subscribe(res => {
      if (res instanceof Error){
        this.displayLoginError(res)
      } else {
          this.navCtrl.push(MapPage);

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

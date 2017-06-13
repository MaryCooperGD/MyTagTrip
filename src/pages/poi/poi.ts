import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { Api } from '../../providers/api';


@Component({
  selector: 'page-poi',
  templateUrl: 'poi.html',
})
export class PoiPage {

  username: any;
  photoURL: any;
  poi: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public api: Api, 
  public menuCtrl: MenuController) {
        this.username = api.user.displayName
        this.photoURL = api.user.photoURL
        this.poi = "Prova"
      //  var base64 = this.getBase64Image(document.getElementById("imageid"));
        
  }

  ionViewDidLoad() {
    this.menuCtrl.close();
  }

  getBase64Image(img) {
  var canvas = document.createElement("canvas");
  canvas.width = img.width;
  canvas.height = img.height;
  var ctx = canvas.getContext("2d");
  ctx.drawImage(img, 0, 0);
  var dataURL = canvas.toDataURL("image/png");
  return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
}



}

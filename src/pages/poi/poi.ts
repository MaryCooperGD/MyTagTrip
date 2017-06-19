import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { Api } from '../../providers/api';

import firebase from 'firebase';
@Component({
  selector: 'page-poi',
  templateUrl: 'poi.html',
})
export class PoiPage {

  username: any;
  photoURL: any;
  poi: any;
  name:any;
  poiKey:any;
  public poiList:Array<any>;
  public loadedPoiList:Array<any>;
  public tags: Array<any> = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public api: Api, 
  public menuCtrl: MenuController) {
        //this.username = api.user.displayName
        //this.photoURL = api.user.photoURL
        this.poi = navParams.get('poiSelected')
        this.poiKey = navParams.get('poikey')
        this.name = this.poi.name 
        this.photoURL = this.poi.imageURL
        let tags1= [];

      var ref = firebase.database().ref('/pois/'+this.poiKey+'/tags/')
      var ref1 = firebase.database().ref('/tags/');

      ref.once('value', function(snapshot) {
      snapshot.forEach(function(childSnapshot){
         var childKey = childSnapshot.key;
         var childData = childSnapshot.val();
         ref1.once('value', function(snapshot) {
        snapshot.forEach(function(childSnapshot){
         var childKey1 = childSnapshot.key;
         var childData1 = childSnapshot.val();
         if(childKey == childKey1){
           tags1.push(childData1.name)
         }
         console.log('Chiave '+childKey + ' Valore '+childData1.name);
         return false
        });
      });
         return false  
      });
    });
   
      /*ref.once("value")
        .then(function(snapshot) { //Per prendere le chiavi dei tags
          snapshot.forEach(tag1 =>{
            //tags1.push(tag.key);
            ref1.once("value").then(function(snapshot){
              snapshot.forEach(tag => {
                if(tag1 == tag){
                  console.log(snapshot.child(tag.key+"/name").val());
                } 
              })
            })
          })         
      });*/

      /*this.tags = tags1;
      console.log(this.tags.length);
      ref = firebase.database().ref('/tags/');
      ref.once("value").then(function(snapshot){
        snapshot.forEach(tag => {
          console.log(snapshot.child(tag.key+"/name").val());
        })
      })
      this.tags.forEach(tag=>{
        //ref.once("value").then(function(snapshot){
          //var name = snapshot.child(tag).child("name").val();
         // this.loadedPoiList.push(name);
          console.log('nome tag '+tag);
      //  })
    });*/
    this.loadedPoiList = tags1;
    this.poiList = tags1;
    this.initializeItems();
  }

  initializeItems(): void {
  this.poiList = this.loadedPoiList;
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

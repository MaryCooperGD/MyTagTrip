import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';

import { ItemDetailPage } from '../item-detail/item-detail';
import { GoogleMaps, GoogleMap, GoogleMapsEvent, LatLng, CameraPosition,MarkerOptions, Marker } from '@ionic-native/google-maps';

import { Item } from '../../models/item';
import { RouteDisplay } from "../routedisplaypage/routedisplaypage";
import { Items } from '../../providers/providers';
import firebase from 'firebase';

declare var google: any;

@Component({
  selector: 'page-choosetags',
  templateUrl: 'choosetags.html'
})
export class ChoosetagsPage {

  selectedItems: Set<String>;

  public cityname: any;
  public loader: any;
  public tagList:Array<any>;
  public loadedTagList:Array<any>;
  public tagRef:firebase.database.Reference;
  city:any;
  userCurrentPosition : LatLng;

  public keyss = [];
  constructor(public navCtrl: NavController, public navParams: NavParams, public items: Items, public loading: LoadingController) {

    this.loader = loading.create({
      content: 'Calculating route...'
    });

    this.selectedItems = new Set<String>();
    this.city = navParams.get('reference')
    this.cityname = this.city.name
    this.userCurrentPosition = navParams.get('coordinates')

    let tags = [];
    let keys = [];
    this.tagRef = firebase.database().ref('tags/');

    this.tagRef.on("child_added", function(snapshot) {
      var tag = snapshot.val();
      keys.push(snapshot.key);
      tags.push(tag);
    });

  this.keyss = keys;
  this.tagList = tags;
  this.loadedTagList = tags;

  }

  initializeItems(): void {
  this.tagList = this.loadedTagList;
}

calculatePath(){

  var directionsService = new google.maps.DirectionsService();
  var waypts = []
  waypts.push({
    location: 'Conad Romagna, Viale Carpi, Riccione, RN',
    stopover: false
  })
  waypts.push({
    location: 'Prodet, Viale Carpi, Riccione, RN',
    stopover: false
  })
  var request ={
    origin: this.userCurrentPosition,
    destination: this.userCurrentPosition,
    travelMode: 'WALKING' ,
    waypoints : waypts,
    optimizeWaypoints: true,
  };


  this.loader.present().then(() => {
    directionsService.route(request, function(result, status) {
      this.loader.dismiss()
      if (status == 'OK') {
        this.navCtrl.push(RouteDisplay, {
          route: result
        });
      } else {
        //TODO error!
      }
    });
  })



}

  selectTag(index:any){
    let key = this.keyss[index]
    if(this.selectedItems.has(key)){
      this.selectedItems.delete(key)
    } else {
      this.selectedItems.add(key)
    }
  }
getItems(searchbar) {
  // Reset items back to all of the items
  this.initializeItems();

  // set q to the value of the searchbar
  var q = searchbar.srcElement.value;


  // if the value is an empty string don't filter the items
  if (!q) {
    return;
  }

  this.tagList = this.tagList.filter((v) => {
    if(v.name && q) {
      if (v.name.toLowerCase().indexOf(q.toLowerCase()) > -1) {
        return true;
      }
      return false;
    }
  });
}

}

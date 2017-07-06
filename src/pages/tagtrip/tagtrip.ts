import { Component, ViewChild } from '@angular/core';
import {App, NavController, Platform, ToastController, MenuController } from 'ionic-angular';
import { Api } from '../../providers/api';
import { GoogleMaps, GoogleMap, GoogleMapsEvent, LatLng, CameraPosition,MarkerOptions, Marker } from '@ionic-native/google-maps';
import { Geolocation } from '@ionic-native/geolocation';
import { Observable } from "rxjs/Observable";
import { CitytripPage} from '../citytrip/citytrip';
import 'rxjs/add/observable/of';

declare var google: any;

@Component({
  selector: 'page-tagtrip',
  templateUrl: 'tagtrip.html'
})
export class TagTripPage {
  username:any;
  @ViewChild('map') map;
  userCurrentPosition: LatLng;

  constructor(public _app: App , private googleMaps: GoogleMaps, public navCtrl: NavController, public platform: Platform,
  public menuCtrl : MenuController, public api:Api, public toastCtrl: ToastController,private geolocation: Geolocation) {
        this.username = api.user.displayName
  }




  ngAfterViewInit() {
    this.loadMap();
  }

  ionViewDidLoad(){
    this.menuCtrl.enable(true)
    this.menuCtrl.close();
  }

ionViewDidEnter() {
    this._app.setTitle("Home")
  }

  getItems(searchbar) {
  //search for cities on db
  }
  loadMap() {
    // make sure to create following structure in your view.html file
    // and add a height (for example 100%) to it, else the map won't be visible
    // <ion-content>
    //  <div #map id="map" style="height:100%;"></div>
    // </ion-content>

    // create a new map by passing HTMLElement
    let element: HTMLElement = document.getElementById('map');

    let map: GoogleMap = this.googleMaps.create(element);

    // listen to MAP_READY event
    // You must wait for this event to fire before adding something to the map or modifying it in anyway
    map.one(GoogleMapsEvent.MAP_READY).then(() => {

      this.geolocation.getCurrentPosition().then((resp) => {
        let currentPosition: LatLng = new LatLng(resp.coords.latitude, resp.coords.longitude);
        this.userCurrentPosition = currentPosition;
        let position: CameraPosition = {
          target: currentPosition,
          zoom: 18,
          tilt: 30
        };

        // move the map's camera to position
        map.moveCamera(position);

        // create new marker
         let markerOptions: MarkerOptions = {
           position: currentPosition,
           title: 'Your Position'
         };

         map.addMarker(markerOptions)
           .then((marker: Marker) => {
              marker.showInfoWindow();
            });

      }).catch((error) => {
        this.displayMapError(error.message)
      });

    });




    // initJSMaps(mapEle) {
    //   new google.maps.Map(mapEle, {
    //     center: { lat: 43.071584, lng: -89.380120 },
    //     zoom: 16
    //   });
    // }

    // initNativeMaps(mapEle) {
    //   this.map = new GoogleMap(mapEle);
    //   mapEle.classList.add('show-map');

    //   GoogleMap.isAvailable().then(() => {
    //     const position = new GoogleMapsLatLng(43.074395, -89.381056);
    //     this.map.setPosition(position);
    //   });
    // }

    // ionViewDidLoad() {
    //   let mapEle = this.map.nativeElement;

    //   if (!mapEle) {
    //     console.error('Unable to initialize map, no map element with #map view reference.');
    //     return;
    //   }

    //   // Disable this switch if you'd like to only use JS maps, as the APIs
    //   // are slightly different between the two. However, this makes it easy
    //   // to use native maps while running in Cordova, and JS maps on the web.
    //   if (this.platform.is('cordova') === true) {
    //     this.initNativeMaps(mapEle);
    //   } else {
    //     this.initJSMaps(mapEle);
    //   }
    // }

  }

  planTrip(){
    this.displayMapError ("entrato in plantrip") //questo funzione
    this.navCtrl.push(CitytripPage, { //questo no!
      reference: this.userCurrentPosition
    });
  }

  displayMapError(err :string){
    let toast = this.toastCtrl.create({
      message: err,
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }
}

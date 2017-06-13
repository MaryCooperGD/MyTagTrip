import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { ItemDetailPage } from '../item-detail/item-detail';

import { Item } from '../../models/item';
import { PoiPage } from "../poi/poi";
import { Items } from '../../providers/providers';
import firebase from 'firebase';

@Component({
  selector: 'page-searchpoi',
  templateUrl: 'searchpoi.html'
})
export class SearchpoiPage {
  
  currentItems: any = [];

  public poiList:Array<any>;
  public loadedPoiList:Array<any>;
  public poiRef:firebase.database.Reference;
  constructor(public navCtrl: NavController, public navParams: NavParams, public items: Items) { 

    this.poiRef = firebase.database().ref('/pois');

    //creo la lista di points of interests
    this.poiRef.on('value', poiList => {
    let pois = [];
    poiList.forEach( poi => {
      pois.push(poi.val());
      return false;
    });

  this.poiList = pois;
  this.loadedPoiList = pois;
});
  }

  initializeItems(): void {
  this.poiList = this.loadedPoiList;
}

openPage(){
  this.navCtrl.push(PoiPage);
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

  this.poiList = this.poiList.filter((v) => {
    if(v.name && q) {
      if (v.name.toLowerCase().indexOf(q.toLowerCase()) > -1) {
        return true;
      }
      return false;
    }
  });
}

}

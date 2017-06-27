import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { ItemDetailPage } from '../item-detail/item-detail';
import { GoogleMaps, GoogleMap, GoogleMapsEvent, LatLng, CameraPosition,MarkerOptions, Marker } from '@ionic-native/google-maps';

import { Item } from '../../models/item';
import { PoiPage } from "../poi/poi";
import { Items } from '../../providers/providers';
import firebase from 'firebase';

@Component({
  selector: 'page-choosetags',
  templateUrl: 'choosetags.html'
})
export class ChoosetagsPage {

  selectedItems: Set<String>;

  public tagList:Array<any>;
  public loadedTagList:Array<any>;
  public tagRef:firebase.database.Reference;
  city:any;
  userCurrentPosition : LatLng;

  public keyss = [];
  constructor(public navCtrl: NavController, public navParams: NavParams, public items: Items) {
    this.selectedItems = new Set<String>();
    this.city = navParams.get('reference')
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
  //wrong, see todo
  this.navCtrl.push(PoiPage, {
    selectedTags: this.selectedItems,
    city: this.city
  });

//TODO first calculate the path and then push the page with the solution

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

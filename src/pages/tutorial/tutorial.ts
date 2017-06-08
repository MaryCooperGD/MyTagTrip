import { Component } from '@angular/core';
import { MenuController, NavController } from 'ionic-angular';

import { WelcomePage } from '../welcome/welcome';

import { TranslateService } from '@ngx-translate/core';



export interface Slide {
  title: string;
  description: string;
  image: string;
}

@Component({
  selector: 'page-tutorial',
  templateUrl: 'tutorial.html'
})
export class TutorialPage {
  slides: Slide[];
  showSkip = true;

  constructor(public navCtrl: NavController, public menu: MenuController) {

        this.slides = [
          {
            title: "Welcome to My Tag Trip!",
            description: "My Tag Trip lets you organize your cultural trip using tags entered by users",
            image: 'assets/img/FirstIconSlide.png',
          },
          {
            title: "Plan your trip",
            description: "Enter the city and choose the tags to plan your journey",
            image: 'assets/img/ica-slidebox-img-2.png',
          },
          {
            title: "Enter new tags",
            description: "Add new tags to points of interest to improve the experience",
            image: 'assets/img/ica-slidebox-img-3.png',
          }
        ];
  }

  startApp() {
    this.navCtrl.setRoot(WelcomePage, {}, {
      animate: true,
      direction: 'forward'
    });
  }

  onSlideChangeStart(slider) {
    this.showSkip = !slider.isEnd;
  }

  ionViewDidEnter() {
    // the root left menu should be disabled on the tutorial page
    this.menu.enable(false);
  }

  ionViewWillLeave() {
    // enable the root left menu when leaving the tutorial page
    this.menu.enable(true);
  }

}

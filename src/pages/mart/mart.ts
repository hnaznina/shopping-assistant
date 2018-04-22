import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Toast } from '@ionic-native/toast';
import { DatabaseProvider } from './../../providers/database/database';
import { AlertController } from 'ionic-angular';

/**
 * Generated class for the MartPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-mart',
  templateUrl: 'mart.html',
})
export class MartPage {
  martName: any;
  mart = {};
  marts: any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private sqlite: SQLite, private toast: Toast, private databaseprovider: DatabaseProvider,
    private alertCtrl: AlertController) {
    this.loadMarts();
  }

  ionViewDidLoad() {
  }

  loadMarts() {
    this.databaseprovider.getAllMarts().then(data => {
      this.marts = data;
    });

    //this.toast.show("Marts loaded susscefully" + this.marts.length, '5000', 'center').subscribe(toast => { console.log(toast); });
  }

  addMart() {
    this.databaseprovider.addMart(this.mart['martName'])
      .then(data => {
        this.loadMarts();
      });
    this.mart = {};
  }

}

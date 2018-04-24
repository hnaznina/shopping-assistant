import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Toast } from '@ionic-native/toast';
import { DatabaseProvider } from './../../providers/database/database';
import { AlertController } from 'ionic-angular';
import { StorePage } from '../store/store';

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
  }

  addMart(martName) {
    this.databaseprovider.addMart(martName)
      .then(data => {
        this.loadMarts();
      });
  }

  editMart(martId, martName) {
    this.databaseprovider.updateMart(martId, martName)
      .then(data => {
        this.loadMarts();
      });
  }

  removeMart(martId) {
    this.databaseprovider.removeMart(martId);
    this.loadMarts();
  }

  openStorePage(martId) {
    this.navCtrl.push(StorePage, { martId: martId });
  }

  presentMartAddOrEditPrompt(martId, martName) {
    let alert = this.alertCtrl.create({
      title: 'Provide Mart Name',
      inputs: [
        {
          name: 'martName',
          placeholder: 'Mart Name',
          value: martName
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {
            if (martId != null) {
              this.editMart(martId, data.martName);
            } else {
              this.addMart(data.martName);
            }
          }
        }
      ]
    });
    alert.present();
  }

  reorderItems(indexes) {
    let element = this.marts[indexes.from];
    this.marts.splice(indexes.from, 1);
    this.marts.splice(indexes.to, 0, element);
  }

}

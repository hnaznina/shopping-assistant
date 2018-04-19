import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Toast } from '@ionic-native/toast';
import { DatabaseProvider } from './../../providers/database/database';

/**
 * Generated class for the ItemPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-item',
  templateUrl: 'item.html',
})
export class ItemPage {
  itemName: any;
  item = {};
  items: any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private sqlite: SQLite, private toast: Toast, private databaseprovider: DatabaseProvider) {
      this.databaseprovider.getDatabaseState().subscribe(rdy => {
        if (rdy) {
          this.loadItems();
        }
      })
  }

  loadItems() {
    this.databaseprovider.getAllItems().then(data => {
      this.items = data;
    });

    this.toast.show("Items loaded susscefully", '5000', 'center').subscribe(toast => {console.log(toast);});
  }

  addItem() {
    this.databaseprovider.addItem(this.item['itemName'], 0)
    .then(data => {
      this.loadItems();
    });
    this.item = {};
  }

  ionViewDidLoad() {
    this.toast.show('ionViewDidLoad', '5000', 'center').subscribe();
    //this.getItems();
  }

  ionViewWillEnter() {
    this.toast.show('ionViewWillEnter', '5000', 'center').subscribe();
    //this.getItems();
  }


}


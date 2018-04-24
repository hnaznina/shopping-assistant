import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Toast } from '@ionic-native/toast';
import { DatabaseProvider } from './../../providers/database/database';
import { AlertController } from 'ionic-angular';
import { ModalController } from 'ionic-angular';

/**
 * Generated class for the ItemPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-item',
  templateUrl: 'item.html'
})
export class ItemPage {
  itemName: any;
  item = {};
  items: any = [];
  term: any;


  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private toast: Toast,
    private databaseprovider: DatabaseProvider,
    private alertCtrl: AlertController,
    public modalCtrl: ModalController) {
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

    //this.toast.show("Items loaded susscefully", '2000', 'center').subscribe(toast => { console.log(toast); });
  }

  addItem() {
    this.openItemModal({});
  }

  removeItem(itemId) {
    this.databaseprovider.removeItem(itemId);
    this.loadItems();
    this.toast.show('remove item' + itemId, '2000', 'center').subscribe();
  }

  public openItemModal(item) {
    var itemModal = this.modalCtrl.create('ItemModalPage', { item: JSON.stringify(item) });

    itemModal.onDidDismiss(data => {
      this.loadItems();
    });

    itemModal.present();
  }

  reorderItems(indexes) {
    let element = this.items[indexes.from];
    this.items.splice(indexes.from, 1);
    this.items.splice(indexes.to, 0, element);
  }



}


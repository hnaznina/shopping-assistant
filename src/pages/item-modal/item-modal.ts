import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ViewController } from 'ionic-angular';
import { DatabaseProvider } from './../../providers/database/database';
import { Toast } from '@ionic-native/toast';

/**
 * Generated class for the ItemModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-item-modal',
  templateUrl: 'item-modal.html',
})
export class ItemModalPage {
  itemNameModalInput: any;
  item: any;
  marts: any = [];
  selectedMartIds: any = [];

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    private toast: Toast,
    private databaseprovider: DatabaseProvider) {
    this.selectedMartIds = [];
    this.item = JSON.parse(this.navParams.get('item'));
    this.loadMarts();
  }

  ionViewWillEnter() {
  }

  public closeModal() {
    this.viewCtrl.dismiss();
  }

  loadMarts() {
    this.databaseprovider.getAllMarts().then(data => {
      this.marts = data;

      if (!this.isNewItem(this.item)) {
        this.loadSelectedMartIds(this.item.itemId);
      }
      //this.toast.show("Marts loaded susscefully " + this.marts.length, '2000', 'center').subscribe(toast =>{console.log(toast); });
    });
  }

  loadSelectedMartIds(itemId) {
    this.databaseprovider.getSelectedMartIdsByItemId(itemId).then(data => {
      this.selectedMartIds = data;

      //set selected flag of mart for this Item
      for (let i = 0; i < this.marts.length; i++) {
        this.marts[i].uiSelected = (this.selectedMartIds.indexOf(this.marts[i].martId) > -1);
        this.marts[i].dbSelected = this.marts[i].uiSelected;
      }
    });
  }

  addOrUpdateItem(mart) {
    this.databaseprovider.addOrUpdateItem(this.item).then(data => {
      // add new item
      if (this.isNewItem(this.item)) {
        this.databaseprovider.getItemByName(this.item.itemName).then(data => {
          this.item = data;
          for (let i = 0; i < this.marts.length; i++) {
            if (this.marts[i].uiSelected === true) {
              this.databaseprovider.addItemMart(this.marts[i].martId, this.item.itemId);
            }
          }
        });
      }
      // edit existing item
      else {
        for (let i = 0; i < this.marts.length; i++) {
          if (this.marts[i].uiSelected === true && this.marts[i].dbSelected === false) {
            this.databaseprovider.addItemMart(this.marts[i].martId, this.item.itemId);
          } else if (this.marts[i].uiSelected === false && this.marts[i].dbSelected === true) {
            this.databaseprovider.removeItemMart(this.marts[i].martId, this.item.itemId);
          }
        }
      }

      this.closeModal();
    });
  }

  isNewItem(item) {
    return item.itemId === undefined || item.itemId === null;
  }

}

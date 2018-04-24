import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Toast } from '@ionic-native/toast';
import { DatabaseProvider } from './../../providers/database/database';
import { ModalController } from 'ionic-angular';
import { StoreLocationModalPage } from '../store-location-modal/store-location-modal';

/**
 * Generated class for the StorePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-store',
  templateUrl: 'store.html',
})
export class StorePage {
  martId: any;
  stores: any = [];

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private toast: Toast,
    private databaseprovider: DatabaseProvider,
    public modalCtrl: ModalController) {
      this.martId = navParams.get("martId");
      
  }

  ionViewWillEnter() {
    this.loadStores();
  }

  loadStores() {
    this.databaseprovider.getStoresByMartId(this.martId).then(data => {
      this.stores = data;
    });

    //this.toast.show("Items loaded susscefully", '2000', 'center').subscribe(toast => { console.log(toast); });
  }
  
  addStore() {
    this.openStoreLocationModal();
  }

  removeStore(storeId) {
    this.databaseprovider.removeStore(storeId);
    this.loadStores();
  }

  public openStoreLocationModal() {
    // var storeLocationModal = this.modalCtrl.create('StoreLocationModalPage', {});
    // storeLocationModal.onDidDismiss(data => {
    //   this.loadStores();
    // });
    // storeLocationModal.present();

    this.navCtrl.push(StoreLocationModalPage, {martId: this.martId});
  }

}
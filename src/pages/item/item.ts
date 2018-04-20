import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Toast } from '@ionic-native/toast';
import { DatabaseProvider } from './../../providers/database/database';
import { AlertController } from 'ionic-angular';

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
  allMarts: any = [];


  constructor(public navCtrl: NavController, public navParams: NavParams,
    private sqlite: SQLite, private toast: Toast, private databaseprovider: DatabaseProvider,
    private alertCtrl: AlertController) {
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

    this.toast.show("Items loaded susscefully", '5000', 'center').subscribe(toast => { console.log(toast); });
  }

  loadMarts() {
    this.databaseprovider.getAllMarts().then(data => {
      this.allMarts = data;
    });
    return this.allMarts;

    // this.toast.show("Items loaded susscefully", '5000', 'center').subscribe(toast => { console.log(toast); });
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

  itemDetails() {
    this.toast.show('item details', '5000', 'center').subscribe();

  }

  removeItem(itemId) {
    this.databaseprovider.removeItem(itemId);
    this.loadItems();
    this.toast.show('remove item' + itemId, '10000', 'center').subscribe();

  }

  itemEdit(itemName) {
    let marts: any = ['walmart', 'target'];

    let alert = this.alertCtrl.create();
    alert.setTitle('Edit: ' + itemName);
    alert.addInput({ type: 'inputs', name: "itemName", value: itemName });

    //marts = this.loadMarts();

    this.toast.show('Marts: ' + marts, '10000', 'center').subscribe();

    marts.forEach(element => {
      alert.addInput({
        type: 'checkbox',
        label: element.martName,
        value: element.martName,
        checked: true
      });
    });
    alert.addButton('Cancel');
    alert.addButton({
      text: 'Okay',
      handler: data => {
        this.databaseprovider.updateItem(itemName, data.itemName);
        this.loadItems();
        this.toast.show('Item name changed from : ' + itemName + ' to:' + data.itemName, '10000', 'center').subscribe();
        console.log('Checkbox data:', data);
      }
    });
    alert.present();
  }


}


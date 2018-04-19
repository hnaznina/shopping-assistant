import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Toast } from '@ionic-native/toast';

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
  items: any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private sqlite: SQLite, private toast: Toast) {
  }

  ionViewDidLoad() {
    this.toast.show('ionViewDidLoad', '5000', 'center').subscribe();
    this.getItems();
  }

  ionViewWillEnter() {
    this.toast.show('ionViewWillEnter', '5000', 'center').subscribe();
    this.getItems();
  }

  

  getItems() {
    //alert("app up 1");
    this.toast.show(`I'm a toast`, '5000', 'center').subscribe();

    this.sqlite.create({
      name: 'shopassist.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      db.executeSql('CREATE TABLE IF NOT EXISTS item(itemId INTEGER PRIMARY KEY AUTOINCREMENT, itemName TEXT, selectFlag INT)', {})
        .then(res => console.log('Executed SQL'))
        .catch(e => console.log(e));
      db.executeSql('SELECT * FROM item ORDER BY itemId DESC', {})
        .then(res => {
          this.items = [];
          for (var i = 0; i < res.rows.length; i++) {
            this.items.push({ itemId: res.rows.item(i).itemId, itemName: res.rows.item(i).itemName, selectFlag: res.rows.item(i).selectFlag })
          }
          this.toast.show('found item count: ' + res.rows.length, '5000', 'center').subscribe();
        })
        .catch(e => console.log(e));
      
    }).catch(e => console.log(e));
  }



  addItem() {
   
    
    this.sqlite.create({
      
      name: 'shopassist.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      // db.executeSql('CREATE TABLE IF NOT EXISTS item(itemId INTEGER PRIMARY KEY, itemName TEXT, selectFlag INT)', {})
      //   .then(res => {
      //     console.log(res);
      //     this.toast.show('Data saved', '5000', 'center').subscribe(
      //       toast => {
      //         //this.navCtrl.popToRoot();
      //       }
      //     );
      //   })
      //   .catch(e => console.log(e));

      
        db.executeSql('INSERT INTO item (itemName,selectFlag) VALUES(?,?)',[this.itemName, 0 ])
        .then(res => {
          console.log(res);
          this.toast.show('Data saved', '5000', 'center').subscribe(
            toast => {
             // this.navCtrl.popToRoot();
            }
          );
        })
        .catch(e => {
          console.log(e);
          this.toast.show(e, '5000', 'center').subscribe(
            toast => {
              console.log(toast);
            }
          );
        });
  
        // *** */
    }).catch(e => console.log(e));
  // alert(this.itemName);

    
  }

}


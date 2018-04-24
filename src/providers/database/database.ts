import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { SQLitePorter } from '@ionic-native/sqlite-porter';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { BehaviorSubject } from 'rxjs/Rx';
import { Storage } from '@ionic/storage';

@Injectable()
export class DatabaseProvider {
  private databaseVer: number = 7;
  database: SQLiteObject;
  private databaseReady: BehaviorSubject<boolean>;

  constructor(public sqlitePorter: SQLitePorter, private storage: Storage,
    private sqlite: SQLite, private platform: Platform, private http: Http) {
    this.databaseReady = new BehaviorSubject(false);
    this.platform.ready().then(() => {
      this.sqlite.create({
        name: 'shopasst.db',
        location: 'default'
      })
        .then((db: SQLiteObject) => {
          this.database = db;
          this.storage.get('database_ver').then(ver => {
            if (this.databaseVer != ver) {
              this.dropAllDbTables();
            }
          });

          this.storage.get('database_filled').then(val => {
            if (val) {
              this.databaseReady.next(true);
            } else {
              this.fillDatabase();
            }
          });
        });
    });
  }

  dropAllDbTables() {
    this.http.get('assets/sql/dropTables.sql').map(res => res.text())
      .subscribe(sql => {
        this.sqlitePorter.importSqlToDb(this.database, sql)
          .then(data => {
            this.storage.set('database_filled', false);
          })
          .catch(e => console.error(e));
      });
  }

  fillDatabase() {
    this.http.get('assets/sql/dummyDump.sql').map(res => res.text())
      .subscribe(sql => {
        this.sqlitePorter.importSqlToDb(this.database, sql)
          .then(data => {
            this.databaseReady.next(true);
            this.storage.set('database_filled', true);
            this.storage.set('database_ver', this.databaseVer);
          })
          .catch(e => console.error(e));
      });
  }

  getDatabaseState() {
    return this.databaseReady.asObservable();
  }


  // Item DAO
  addItem(itemName, selectFlag) {
    let data = [itemName, selectFlag];
    return this.database.executeSql('INSERT INTO item (itemName,selectFlag) VALUES(?,?)', [itemName, selectFlag]).then(data => {
      return data;
    }, err => {
      console.log('Error: ', err);
      return err;
    });
  }

  removeItem(itemId) {
    this.database.executeSql('DELETE FROM item WHERE itemId=?', [itemId]).then(data => {
      return data;
    }, err => {
      console.log('Error: ', err);
    });
  }

  addOrUpdateItem(item): Promise<any> {
    if (item.itemId != null) {
      return this.database.executeSql('UPDATE item SET itemName=?, selectFlag=? WHERE itemId=?', [item.itemName, item.selectFlag, item.itemId]).then(data => {
        return data;
      },
        err => {
          console.log('Error: ', err);
        });
    } else {
      return this.database.executeSql('INSERT INTO item (itemName,selectFlag) VALUES(?,?)', [item.itemName, item.selectFlag]).then(data => {
        return data;
      },
        err => {
          console.log('Error: ', err);
        });
    }
  }

  getAllItems() {
    return this.database.executeSql("SELECT * FROM item", []).then((data) => {
      let items = [];
      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {
          items.push({ itemId: data.rows.item(i).itemId, 
            itemName: data.rows.item(i).itemName, 
            selectFlag: data.rows.item(i).selectFlag });
        }
      }
      return items;
    }, err => {
      console.log('Error: ', err);
      return [];
    });
  }

  getItemByName(itemName) {
    return this.database.executeSql("SELECT * FROM item WHERE itemName = ?", [itemName]).then((data) => {
      let item = {};
      if (data.rows.length > 0) {
        item = { itemId: data.rows.item(0).itemId, 
          itemName: data.rows.item(0).itemName, 
          selectFlag: data.rows.item(0).selectFlag };
      }
      return item;
    }, err => {
      console.log('Error: ', err);
      return {};
    });
  }


  //Mart DAO
  getAllMarts() {
    let allMarts = [];
    return this.database.executeSql("SELECT * FROM mart", []).then((data) => {
      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {
          allMarts.push({ martId: data.rows.item(i).martId, 
            martName: data.rows.item(i).martName, 
            uiSelected: false, 
            dbSelected: false });
        }
      }
      return allMarts;
    }, err => {
      console.log('Error: ', err);
      return [];
    });
  }


  addMart(martName) {
    return this.database.executeSql('INSERT INTO mart (martName) VALUES(?)', [martName]).then(data => {
      return data;
    }, err => {
      console.log('Error: ', err);
      return err;
    });
  }

  removeMart(martId){
    this.database.executeSql('DELETE FROM mart WHERE martId=?', [martId]).then(data => {
      return data;
    }, err => {
      console.log('Error: ', err);
    });
  }

  updateMart(martId, martName) {
    return this.database.executeSql('UPDATE mart SET martName=? WHERE martId=?', [martName, martId]).then(data => {
      return data;
    }, err => {
      console.log('Error: ', err);
      return err;
    });
  }


  // ItemMart DAO
  addItemMart(martId, itemId) {
    return this.database.executeSql('INSERT INTO itemMart (martId, itemId) VALUES(?,?)', [martId, itemId]).then(data => {
      return data;
    }, err => {
      console.log('Error: ', err);
      return err;
    });
  }

  removeItemMart(martId, itemId) {
    return this.database.executeSql('DELETE FROM itemMart WHERE martId = ? AND itemId = ?', [martId, itemId]).then(data => {
      return data;
    }, err => {
      console.log('Error: ', err);
      return err;
    });
  }

  getSelectedMartIdsByItemId(itemId) {
    let martIds = [];
    return this.database.executeSql("SELECT martId FROM itemMart WHERE itemId = ?", [itemId]).then((data) => {
      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {
          martIds.push(data.rows.item(i).martId);
        }
      }
      return martIds;
    }, err => {
      console.log('Error: ', err);
      return [];
    });
  }


  //Store DAO
  addStore(store) {
    return this.database.executeSql('INSERT INTO store (storeName, martId, storeAddress, latitude, longitude) VALUES(?,?,?,?,?)',
      [store.storeName, store.martId, store.storeAddress, store.latitude, store.longitude]).then(data => {
        return data;
      }, err => {
        console.log('Error: ', err);
        return err;
      });
  }

  removeStore(storeId) {
    this.database.executeSql('DELETE FROM store WHERE storeId=?', [storeId]).then(data => {
      return data;
    }, err => {
      console.log('Error: ', err);
    });
  }

  getStoresByMartId(martId){
    let stores = [];
    return this.database.executeSql("SELECT * FROM store WHERE martId = ?", [martId]).then((data) => {
      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {
          stores.push({ storeId: data.rows.item(i).storeId,
            storeName: data.rows.item(i).storeName,
            martId: data.rows.item(i).martId,
            storeAddress: data.rows.item(i).storeAddress,
            latitude: data.rows.item(i).latitude,
            longitude: data.rows.item(i).longitude
          });
        }
      }
      return stores;
    }, err => {
      console.log('Error: ', err);
      return [];
    });
  }

}
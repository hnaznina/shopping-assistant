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
  private databaseVer: number = 1;
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
      //console.log(data);
    }, err => {
      console.log('Error: ', err);
    });
  }

  updateItem(itemNamedb,itemName){
    
    this.database.executeSql('UPDATE item SET itemName=? WHERE itemName=?', [itemName, itemNamedb]).then(data => {
    
    }, err => {
      console.log('Error: ', err);
    });


  }

  getAllItems() {

    return this.database.executeSql("SELECT * FROM item", []).then((res) => {
      let items = [];
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) {
          items.push({ itemId: res.rows.item(i).itemId, itemName: res.rows.item(i).itemName, selectFlag: res.rows.item(i).selectFlag });
        }
      }
      return items;
    }, err => {
      console.log('Error: ', err);
      return [];
    });
  }


  //Mart DAO



  getAllMarts() {
    let allMarts = [];
    return this.database.executeSql("SELECT * FROM mart", []).then((res) => {
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) {
          allMarts.push({ martId: res.rows.item(i).martId, martName: res.rows.item(i).martName});
        }
      }
      return allMarts;
    }, err => {
      console.log('Error: ', err);
      return [];
    });
  }

  addMart(martName){

    return this.database.executeSql('INSERT INTO mart (martName) VALUES(?)', [martName]).then(data => {
      return data;
    }, err => {
      console.log('Error: ', err);
      return err;
    });

  }
}
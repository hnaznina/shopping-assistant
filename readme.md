//create project
ionic start shopping-assistant sidemenu

//sqlite
ionic cordova plugin add cordova-sqlite-storage
npm install --save @ionic-native/sqlite

//toast
ionic cordova plugin add cordova-plugin-x-toast
npm install --save @ionic-native/toast

//add new page
ionic g page Mart

//run on device
ionic cordova run android --device

//run on emulator
ionic cordova emulate android

//live-reload changes
ionic cordova emulate android --livereload

//Database name:	shopassis.db
//Table name: item

//check all plugins
ionic cordova plugin


//db need to delete
developers.db

//SQL provider
ionic g provider database

//SQLite Porter
ionic cordova plugin add uk.co.workingedge.cordova.plugin.sqliteporter
npm install --save @ionic-native/sqlite-porter @ionic-native/sqlite

//Create Modal Page
ionic g page ModalPage

//Create pipe
ionic g pipe search
import { Component } from 'react';
import SqliteStorage from 'react-native-sqlite-storage';
let db;
export default class SqliteUtil extends Component {
    open () {

    }
    create () {
       if (!db) {
           this.open();
       }
    }
};
import { AppRegistry } from 'react-native';
import App from './App/App';
import SQLite from 'react-native-sqlite-storage';

SQLite.DEBUG(true);
SQLite.enablePromise(true);
AppRegistry.registerComponent('algaeExamination', () => App);

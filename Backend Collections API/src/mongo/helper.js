import { databaseName } from './constants';
import { mongoNativeClient } from './mongo';

const getCollection = (collectionName) =>
  mongoNativeClient.db(databaseName).collection(collectionName);

export { getCollection };
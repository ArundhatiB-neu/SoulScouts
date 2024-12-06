import { connect } from 'mongoose';
import { databaseName } from './constants';
import { MongoClient } from 'mongodb';

const uri = ``;
export const mongoNativeClient = new MongoClient(uri, {});

const client = async () => {
  await connect(uri);
};

export { client };

"use server"

import { Datastore } from '@google-cloud/datastore';
import { MapData } from "../type/map";

const credentials = JSON.parse(process.env.GOOGLE_CREDENTIALS!);

const datastore = new Datastore({
  projectId: process.env.GOOGLE_PROJECT_ID,
  credentials,
});
const kind = 'nextjs-test';
const name = 'travel';
const taskKey = datastore.key([kind, name]);

export const getDataFromGcloud = (): Promise<MapData> => {
  return datastore.get(taskKey).then(getResponse => {

    const _data = getResponse[0];
    const data: MapData = {};
    for (const key in _data) {
      data[key] = _data[key];
    }

    return data;
  }).catch((e) => {
    console.log(e);
    return {};
  });


};

export const putDataFromGcloud = (data: MapData) => {

  const task = {
    key: taskKey,
    data: data
  }
  datastore.save(task);
}


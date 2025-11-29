"use server"

import { MapData } from "@/type/map";
import { Datastore } from '@google-cloud/datastore';

let datastore: Datastore | null = null;
let taskKey: ReturnType<Datastore['key']> | null = null;

const initializeDatastore = () => {
  if (datastore) return;

  try {
    const credentials = JSON.parse(process.env.GOOGLE_CREDENTIALS!);
    datastore = new Datastore({
      projectId: process.env.GOOGLE_PROJECT_ID,
      credentials,
    });

    const kind = 'nextjs-test';
    const name = 'travel';
    taskKey = datastore.key([kind, name]);
  } catch (error) {
    console.error('Failed to initialize Datastore:', error);
    throw error;
  }
};

/**
 * Get data from Google Cloud Datastore
 */
export const getDataFromGcloud = async (): Promise<MapData> => {
  try {
    initializeDatastore();

    const getResponse = await (datastore!.get(taskKey!));
    const _data = getResponse[0];

    if (!_data) {
      console.warn('No data found in Datastore');
      return {};
    }

    const data: MapData = {};
    for (const key in _data) {
      data[key] = _data[key];
    }

    return data;
  } catch (error) {
    console.error('Error fetching from Datastore:', error);
    throw error;
  }
};

/**
 * Update data in Google Cloud Datastore
 */
export const putDataFromGcloud = async (data: MapData): Promise<void> => {
  try {
    initializeDatastore();

    const task = {
      key: taskKey,
      data: data
    };
    await datastore!.save(task);
  } catch (error) {
    console.error('Error updating Datastore:', error);
    throw error;
  }
};

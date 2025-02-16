"use server"

import { MapData } from './data';

const mockData: MapData = {"鳥取":{"grade":0,"memo":"","pickup":0},"石川":{"grade":4,"memo":"","pickup":0},"埼玉":{"grade":2,"memo":"","pickup":0},"岐阜":{"grade":3,"memo":"","pickup":0},"島根":{"grade":4,"memo":"","pickup":0},"福島":{"grade":2,"memo":"","pickup":0},"岩手":{"grade":0,"memo":"","pickup":0},"栃木":{"grade":0,"memo":"","pickup":0},"秋田":{"grade":0,"memo":"","pickup":0},"青森":{"grade":0,"memo":"","pickup":0},"北海道":{"grade":5,"memo":"","pickup":0},"東京":{"grade":5,"memo":"","pickup":0},"群馬":{"grade":3,"memo":"","pickup":0},"広島":{"grade":4,"memo":"","pickup":0},"滋賀":{"grade":0,"memo":"","pickup":0},"山口":{"grade":0,"memo":"","pickup":0},"山形":{"grade":0,"memo":"","pickup":0},"京都":{"grade":4,"memo":"","pickup":0},"山梨":{"grade":0,"memo":"","pickup":0},"兵庫":{"grade":1,"memo":"","pickup":0},"高知":{"grade":3,"memo":"","pickup":0},"神奈川":{"grade":2,"memo":"","pickup":0},"沖縄":{"grade":3,"memo":"","pickup":0},"新潟":{"grade":4,"memo":"日本酒","pickup":0},"長崎":{"grade":0,"memo":"","pickup":0},"長野":{"grade":3,"memo":"","pickup":0},"愛知":{"grade":3,"memo":"","pickup":0},"大阪":{"grade":4,"memo":"","pickup":0},"徳島":{"grade":2,"memo":"","pickup":0},"福井":{"grade":0,"memo":"","pickup":0},"宮崎":{"grade":0,"memo":"","pickup":0},"宮城":{"grade":0,"memo":"","pickup":0},"愛媛":{"grade":4,"memo":"","pickup":0},"熊本":{"grade":2,"memo":"","pickup":0},"千葉":{"grade":2,"memo":"","pickup":0},"奈良":{"grade":0,"memo":"","pickup":0},"三重":{"grade":4,"memo":"","pickup":0},"富山":{"grade":2,"memo":"","pickup":0},"大分":{"grade":0,"memo":"","pickup":0},"茨城":{"grade":1,"memo":"","pickup":0},"香川":{"grade":3,"memo":"","pickup":0},"鹿児島":{"grade":0,"memo":"","pickup":0},"佐賀":{"grade":2,"memo":"","pickup":0},"静岡":{"grade":3,"memo":"","pickup":0},"岡山":{"grade":0,"memo":"","pickup":0},"和歌山":{"grade":4,"memo":"","pickup":0},"福岡":{"grade":3,"memo":"","pickup":0}};

export const getMockData = (): Promise<MapData> => {
  console.log("mock-get");

  return Promise.resolve().then(()=>{return mockData})
};

export const putMockData = ( data:MapData) => {
  console.log("mock-put");
}


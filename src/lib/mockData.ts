"use server"

import { MapData } from './data';

const mockData: MapData = {"鳥取県":{"grade":0,"memo":"","pickup":0},"石川県":{"grade":4,"memo":"","pickup":0},"埼玉県":{"grade":2,"memo":"","pickup":0},"岐阜県":{"grade":3,"memo":"","pickup":0},"島根県":{"grade":4,"memo":"","pickup":0},"福島県":{"grade":2,"memo":"","pickup":0},"岩手県":{"grade":0,"memo":"","pickup":0},"栃木県":{"grade":0,"memo":"","pickup":0},"秋田県":{"grade":0,"memo":"","pickup":0},"青森県":{"grade":0,"memo":"","pickup":0},"北海道":{"grade":5,"memo":"","pickup":0},"東京都":{"grade":5,"memo":"","pickup":0},"群馬県":{"grade":3,"memo":"","pickup":0},"広島県":{"grade":4,"memo":"","pickup":0},"滋賀県":{"grade":0,"memo":"","pickup":0},"山口県":{"grade":0,"memo":"","pickup":0},"山形県":{"grade":0,"memo":"","pickup":0},"京都府":{"grade":4,"memo":"","pickup":0},"山梨県":{"grade":0,"memo":"","pickup":0},"兵庫県":{"grade":1,"memo":"","pickup":0},"高知県":{"grade":3,"memo":"","pickup":0},"神奈川県":{"grade":2,"memo":"","pickup":0},"沖縄県":{"grade":3,"memo":"","pickup":0},"新潟県":{"grade":4,"memo":"日本酒","pickup":0},"長崎県":{"grade":0,"memo":"","pickup":0},"長野県":{"grade":3,"memo":"","pickup":0},"愛知県":{"grade":3,"memo":"","pickup":0},"大阪府":{"grade":4,"memo":"","pickup":0},"徳島県":{"grade":2,"memo":"","pickup":0},"福井県":{"grade":0,"memo":"","pickup":0},"宮崎県":{"grade":0,"memo":"","pickup":0},"宮城県":{"grade":0,"memo":"","pickup":0},"愛媛県":{"grade":4,"memo":"","pickup":0},"熊本県":{"grade":2,"memo":"","pickup":0},"千葉県":{"grade":2,"memo":"","pickup":0},"奈良県":{"grade":0,"memo":"","pickup":0},"三重県":{"grade":4,"memo":"","pickup":0},"富山県":{"grade":2,"memo":"","pickup":0},"大分県":{"grade":0,"memo":"","pickup":0},"茨城県":{"grade":1,"memo":"","pickup":0},"香川県":{"grade":3,"memo":"","pickup":0},"鹿児島県":{"grade":0,"memo":"","pickup":0},"佐賀県":{"grade":2,"memo":"","pickup":0},"静岡県":{"grade":3,"memo":"","pickup":0},"岡山県":{"grade":0,"memo":"","pickup":0},"和歌山県":{"grade":4,"memo":"","pickup":0},"福岡県":{"grade":3,"memo":"","pickup":0}};

export const getMockData = (): Promise<MapData> => {
  console.log("mock-get");

  return Promise.resolve().then(()=>{return mockData})
};

export const putMockData = ( data:MapData) => {
  console.log("mock-put");
}


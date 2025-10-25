"use client";
import ReactECharts from 'echarts-for-react';
import { FC, useEffect, useState } from 'react';
import * as echarts from 'echarts';
import { prefectureData } from '@/lib/prefectureData';
import { ModalUpdateGradePanel } from '../travel/ModalUpdateGradePanel';
import { getChartDataAsync, EChartsData } from '@/lib/data2';

const Body: FC = () => {
  const [isMapReady, setIsMapReady] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [prefecture, setPrefecture] = useState<string>("");
  const [chartData, setChartData] = useState<EChartsData>([]);

  useEffect(() => {
    const initMap = async () => {
      try {
        const response = await fetch('/japan.json');
        if (!response.ok) {
          throw new Error('Failed to fetch GeoJSON');
        }
        const geoJson = await response.json();

        if (!echarts.getMap('JP')) {
          console.log("aaaaa")
          echarts.registerMap('JP', geoJson);
          // echarts.registerMap('JP', geoJson );
        }

        setIsMapReady(true);
      } catch (error) {
        console.error('Error initializing map:', error);
      }
    };

    initMap();
  }, []);

  const getData = () => {
    getChartDataAsync().then((data) => {
      setChartData(data);
    })
  }

  useEffect(() => {
    getData();
  }, [])

  if (!isMapReady) {
    return <div>Loading Map...</div>;
  }

  // クリックイベントハンドラを登録するための onEvents
  const onEvents: { [key: string]: (params: any) => void } = {
    click: (params: any) => {
      console.log('Map clicked:', JSON.stringify(params.data));
      setPrefecture(params.name);
      setIsModalOpen(true);
    }
  }


  const updateCallback = () => {
    setIsModalOpen(false);
  };

  const cancelCallback = () => {
    setIsModalOpen(false);
  };

  const options = {
    title: {
      text: 'Japan Map - Population Density',
      subtext: 'Dummy Data',
    },
    tooltip: {
      trigger: 'item',
      formatter: (params: any) => {
        const { name, value, memo } = params.data;
        return `${name}<br/>Value: ${value}${memo ? `<br/>Memo: ${memo}` : ''}`;
     }

//      formatter: '{b}<br/>Value: {c} {d}',
    },
    visualMap: {
      min: 0,
      max: 5,
      text: ['High', 'Low'],
      realtime: false,
      calculable: true,
      inRange: {
        color: ['#e0f3f8', '#ffffbf', '#fee090', '#fdae61', '#f46d43', '#d73027'],
      },
    },
    series: [
      {
        name: 'Japan Data',
        type: 'map',
        map: 'JP',
        label: {
          show: false,
        },
        data: chartData, // Use the directly matched data
        emphasis: {
          label: {
            show: true,
          },
        },
      },
    ],
  };

  return (

<div style={{ width: '100%', height: '800px', minHeight: 320 }}>
      <ReactECharts option={options}  onEvents={onEvents} style={{ width: '100%', height: '100%' }} />
      {isModalOpen && (
        <ModalUpdateGradePanel prefecture={prefecture} updateCallback={updateCallback} cancelCallback={cancelCallback}></ModalUpdateGradePanel>
      )}
    </div>
  );
};

export default Body;
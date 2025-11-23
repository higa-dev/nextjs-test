"use client";
import { EChartsData } from '@/type/map';
import * as echarts from 'echarts';
import ReactECharts from 'echarts-for-react';
import { FC, useEffect, useState } from 'react';
import { ModalUpdateGradePanel } from './component/ModalUpdateGradePanel';

type EChartsProps = {
  data: EChartsData;
};

const ECharts: FC<EChartsProps> = ({ data }) => {
  const [isMapReady, setIsMapReady] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [prefecture, setPrefecture] = useState<string>("");
  const [layoutCenter, setLayoutCenter] = useState(['50%', '50%']);

  const initMap = async () => {
    try {
      const response = await fetch('/api/japan');
      if (!response.ok) {
        throw new Error('Failed to fetch GeoJSON');
      }
      const geoJson = await response.json();

      if (!echarts.getMap('JP')) {
        echarts.registerMap('JP', geoJson);
      }

      setIsMapReady(true);
    } catch (error) {
      console.error('Error initializing map:', error);
    }
  };

  useEffect(() => {
    const updateLayout = () => {
      const width = window.innerWidth;

      if (width <= 480) {
        setLayoutCenter(['50%', '25%']);
      } else if (width <= 600) {
        setLayoutCenter(['50%', '35%']);
      } else if (width <= 768) {
        setLayoutCenter(['50%', '45%']);
      } else if (width <= 1024) {
        setLayoutCenter(['50%', '50%']);
      } else {
        setLayoutCenter(['50%', '50%']);
      }
    };

    updateLayout();
    window.addEventListener('resize', updateLayout);

    initMap();

    return () => {
      window.removeEventListener('resize', updateLayout);
    };
  }, []);

  const onEvents: { [key: string]: (params: any) => void } = {
    click: (params: any) => {
      setPrefecture(params.name);
      setIsModalOpen(true);
    }
  };

  const updateCallback = () => {
    setIsModalOpen(false);
  };

  const cancelCallback = () => {
    setIsModalOpen(false);
  };

  const options = {
    title: {
      text: '旅行評価マップ',
    },
    tooltip: {
      trigger: 'item',
      formatter: (params: any) => {
        const { name, value, memo } = params.data;
        return `${name}<br/>評価: ${value}${memo ? `<br/>Memo: ${memo}` : ''}`;
      }
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
      left: 'left',
      top: '50px'
    },
    series: [
      {
        name: 'Japan Data',
        type: 'map',
        map: 'JP',
        layoutCenter: layoutCenter,
        layoutSize: "100%",
        label: {
          show: false,
        },
        data: data,
        emphasis: {
          label: {
            show: true,
          },
        },
      },
    ],
  };

  return (
    !isMapReady ? (<div>Loading Map...</div>) : (
      <div style={{ width: '100%', height: '800px', minHeight: 320 }}>
        <ReactECharts option={options} onEvents={onEvents} style={{ width: '100%', height: '100%' }} />
        {isModalOpen && (
          <ModalUpdateGradePanel prefecture={prefecture} updateCallback={updateCallback} cancelCallback={cancelCallback}></ModalUpdateGradePanel>
        )}
      </div>
    )
  );
};

export default ECharts;
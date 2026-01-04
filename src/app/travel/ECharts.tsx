"use client";
import { useJapanGeoJson } from '@/hooks/api/japan/useJapanGeoJson';
import { EChartsData, MapData } from '@/type/map';
import * as echarts from 'echarts';
import ReactECharts from 'echarts-for-react';
import { FC, useCallback, useEffect, useState } from 'react';
import { KeyedMutator } from 'swr';
import { ModalUpdateGradePanel } from './component/ModalUpdateGradePanel';

type EChartsProps = {
  data: EChartsData;
  mutate: KeyedMutator<MapData>;
};

const ECharts: FC<EChartsProps> = ({ data, mutate }) => {
  const [isMapReady, setIsMapReady] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [prefecture, setPrefecture] = useState<string>("");
  const [currentMemo, setCurrentMemo] = useState<string>("");
  const [layoutCenter, setLayoutCenter] = useState(['50%', '50%']);

  const { geoJson, error, isLoading } = useJapanGeoJson();

  const initMap = useCallback(() => {
    if (!geoJson) return;

    try {
      if (!echarts.getMap('JP')) {
        echarts.registerMap('JP', geoJson);
      }

      setIsMapReady(true);
    } catch (error) {
      console.error('Error initializing map:', error);
    }
  }, [geoJson]);

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

    return () => {
      window.removeEventListener('resize', updateLayout);
    };
  }, []);

  useEffect(() => {
    if (!error && !isLoading) {
      initMap();
    }
  }, [geoJson, error, isLoading, initMap]);

  const onEvents: { [key: string]: (params: any) => void } = {
    click: (params: any) => {
      setPrefecture(params.name);
      const memoValue = params.data.memo || "";
      setCurrentMemo(memoValue);
      setIsModalOpen(true);
    }
  };

  const updateCallback = () => {
    setIsModalOpen(false);
    mutate();
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
        const valueText = value === 0 ? '未訪問' : `評価: ${value}`;
        return `${name}<br/>${valueText}${memo ? `<br/>Memo: ${memo}` : ''}`;
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
          <ModalUpdateGradePanel prefecture={prefecture} initialMemo={currentMemo} updateCallback={updateCallback} cancelCallback={cancelCallback}></ModalUpdateGradePanel>
        )}
      </div>
    )
  );
};

export default ECharts;
"use client";

import Chart, { ReactGoogleChartEvent } from "react-google-charts"
import { GoogleChartData, getChartDataAsync } from "../../lib/data";
import { ModalUpdateGradePanel } from "./ModalUpdateGradePanel";
import { useEffect, useState } from "react";

const options = {
  region: 'JP',
  resolution: 'provinces'
};

const Travel = () => {
  const [chartData, setChartData] = useState<GoogleChartData>([[]]);
  const [prefecture, setPrefecture] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const selectCallback = (index: number) => {
    setPrefecture(chartData[index][0].toString());
    setIsModalOpen(true);
  }

  const events: ReactGoogleChartEvent[] = [
    {
      eventName: "select",
      callback: ({ chartWrapper }) => {
        const selection = chartWrapper.getChart().getSelection();
        if (selection.length <= 0) return;
        selectCallback(selection[0].row + 1);
      }
    }
  ];

  const updateCallback = () => {
    setIsModalOpen(false);
    getData();
  }

  const cancelCallback = () => {
    setIsModalOpen(false);
  }

  const getData = () => {
    getChartDataAsync().then((data) => {
      setChartData(data);
    })
  }

  useEffect(() => {
    getData();
  }, [])

  return (
    <>
      {chartData.length > 1 &&
        <Chart
          chartEvents={events}
          chartType="GeoChart"
          width="1000px"
          height="650px"
          data={chartData}
          options={options} />}
      {isModalOpen && (
        <ModalUpdateGradePanel prefecture={prefecture} updateCallback={updateCallback} cancelCallback={cancelCallback}></ModalUpdateGradePanel>
      )}
    </>);
}

export default Travel;

"use client";

import React, { useState } from "react";
import useUpdateChartData from "../../../hooks/api/chart-data/useUpdateChartData";
import Modal from "../../component/modal";
import commonStyles from "../../component/modal.module.scss";
import styles from './ModalUpdateGradePanel.module.scss';

const grades = [1, 2, 3, 4, 5];

type Props = {
  prefecture: string;
  initialMemo: string;
  updateCallback: () => void;
  cancelCallback: () => void;
}

export const ModalUpdateGradePanel: React.FC<Props> = (props) => {

  const { update: updateChartData } = useUpdateChartData();
  const [memo, setMemo] = useState<string>(props.initialMemo);

  const update = async (grade: number) => {
    await updateChartData(props.prefecture, grade, memo);
    props.updateCallback();
  }

  return (
    <Modal close={props.cancelCallback}>
      <div className={`${commonStyles.panel} ${styles.panel}`}>
        <header>
          <div className="flex items-stretch">
            <div className="py-4 flex-1">
              <p>{props.prefecture}の評価</p>
            </div>
            <div className="py-4 justify-end">
              <button type="button" className="bg-white dark:bg-black rounded-md p-2 inline-flex items-center justify-center text-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500" onClick={props.cancelCallback}>
                <span className="sr-only">Close menu</span>
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </header>
        <div>
          <div className="text-red">
            {grades.map(grade => {
              return (
                <button
                  className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full ${styles.button}`}
                  onClick={() => update(grade)}
                  key={grade}
                >
                  {grade}
                </button>)
            })}
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium mb-2 text-gray-900 dark:text-gray-100">メモ（オプション）</label>
            <textarea
              value={memo}
              onChange={(e) => setMemo(e.target.value)}
              placeholder="このエリアについてのメモを入力してください"
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              rows={3}
            />
          </div>
        </div>
        <footer></footer>
      </div>
    </Modal>
  )
}

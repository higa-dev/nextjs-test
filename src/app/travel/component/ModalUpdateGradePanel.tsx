"use client";

import React, { useState } from "react";
import useUpdateChartData from "../../../hooks/api/chart-data/useUpdateChartData";
import Modal from "../../component/modal";
import { GradeButtonGroup } from "./GradeButtonGroup";
import styles from './ModalUpdateGradePanel.module.scss';

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
    <Modal close={props.cancelCallback} title={`${props.prefecture}の評価`}>
      <div className={styles.panel}>
        <GradeButtonGroup onGradeSelect={update} />
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
    </Modal>
  )
}

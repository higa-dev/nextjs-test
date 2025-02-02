'use client'

import React from "react";
import { updateChartData } from "../../lib/data"
import Modal from "../component/modal";
import commonStyles from "../component/modal.module.scss";
import styles from './ModalUpdateGradePanel.module.scss';

const grades = [1, 2, 3, 4, 5];

type Props = {
  prefecture: string;
  updateCallback: () => void;
  cancelCallback: () => void;
}

export const ModalUpdateGradePanel: React.FC<Props> = (props) => {

  const update = (grade: number) => {
    updateChartData(props.prefecture, grade);
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
              <button type="button" className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500" onClick={props.cancelCallback}>
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
                <button className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full ${styles.button}`} onClick={() => update(grade)} key={grade}>{grade}</button>)
            })}
          </div>
        </div>
        <footer></footer>
      </div>
    </Modal>
  )
}

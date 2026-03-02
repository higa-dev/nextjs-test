"use client";

import React from "react";
import { GRADE_OPTIONS } from "../constants/grades";
import styles from "./ModalUpdateGradePanel.module.scss";

type Props = {
  onGradeSelect: (grade: number) => void;
};

export const GradeButtonGroup: React.FC<Props> = ({ onGradeSelect }) => {
  return (
    <div>
      {GRADE_OPTIONS.map((grade) => (
        <button
          className={styles.gradeButton}
          onClick={() => onGradeSelect(grade)}
          key={grade}
        >
          {grade}
        </button>
      ))}
    </div>
  );
};

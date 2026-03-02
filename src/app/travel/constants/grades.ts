export const GRADE_OPTIONS = [1, 2, 3, 4, 5] as const;
export type GradeOption = (typeof GRADE_OPTIONS)[number];

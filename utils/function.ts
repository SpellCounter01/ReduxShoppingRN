import { ScaledSize } from "react-native";

export const getNumColumns = (result: ScaledSize) => {
  const division = result.width / 1000;

  if (division >= 1.2) return 4;
  else if (division >= 0.8) return 3;
  else return 2;
};

export const generateEmptyElements = <
  T extends { id: number; hidden: boolean },
>(
  data: T[],
  columnNumber: number,
): T[] => {
  const missing = columnNumber - (data.length % columnNumber);

  if (missing === columnNumber) return data;

  const maxId = Math.max(0, ...data.map((ele) => ele.id));

  const emptyElements: T[] = Array.from({ length: missing }, (_, i) => ({
    id: maxId + i + 1,
    hidden: true,
  })) as T[];

  return [...data, ...emptyElements];
};

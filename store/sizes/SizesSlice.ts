import { getNumColumns } from "@/utils/function";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Dimensions } from "react-native";

const initialState = {
  numColumns: getNumColumns(Dimensions.get("window")),
};

export const sizeSlice = createSlice({
  name: "Sizes",
  reducers: {
    setColumnNumber: (state, action: PayloadAction<number>) => {
      state.numColumns = action.payload;
    },
  },
  initialState: initialState,
});

export const { setColumnNumber } = sizeSlice.actions;
export default sizeSlice.reducer;

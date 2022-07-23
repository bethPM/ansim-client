import { createSlice } from "@reduxjs/toolkit";
import { RootReducerType } from "../store";

const IS_OPEN = "IS_OPEN";

const isOpenSlice = createSlice({
  name: IS_OPEN,
  initialState: {
    isSearch: false,
    isAnsimInfo: false,
  },
  reducers: {
    isOpenTrigger: (state, { type, payload }) => {
      return {
        ...state,
        ...payload,
      };
    },
  },
});

const { isOpenTrigger } = isOpenSlice.actions;

const selectIsOpen = (state: RootReducerType) => state.isOpen;

export { selectIsOpen, isOpenTrigger };

export default isOpenSlice.reducer;

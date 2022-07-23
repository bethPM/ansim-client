import { createSlice } from "@reduxjs/toolkit";
import { IAnsimInfo } from "../../components/template/interface/IndexTemplate.interface";
import { RootReducerType } from "../store";
import { getAnsimsAction } from "./func/ansimListSlice.func";

const ANSIM_LIST = "ANSIM_LIST";

const initialAnsimListSliceState: IAnsimInfo[] = [
  {
    adres: "",
    bsshNm: "",
    cl: "",
    clNm: "",
    etcAdres: "",
    hmpg: null,
    lcSn: 0,
    lcinfoLa: 0,
    lcinfoLo: 0,
    rn: 0,
    scope: null,
    scopeCd: null,
    telno: "",
    zip: "",
  },
];

const ansimListSlice = createSlice({
  name: ANSIM_LIST,
  initialState: initialAnsimListSliceState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAnsimsAction.pending, (state, { type, payload }) => {});
    builder.addCase(getAnsimsAction.fulfilled, (state, { type, payload }) => {
      return [...payload];
    });
    builder.addCase(getAnsimsAction.rejected, (state, { type, payload }) => {
      console.log(
        `ansimListSlice getAnsimsAction Error type ${type} payload ${payload}`
      );
    });
  },
});

const selectAnsimList = (state: RootReducerType) => state.ansim.ansimList;

export { selectAnsimList };

export default ansimListSlice.reducer;

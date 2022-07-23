import { createSlice } from "@reduxjs/toolkit";
import { IAnsimInfo } from "../../components/template/interface/IndexTemplate.interface";
import { RootReducerType } from "../store";

const ANSIM_INFO = "ANSIM_INFO";

const initialAnsimInfoSliceState: IAnsimInfo = {
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
};

const ansimInfoSlice = createSlice({
  name: ANSIM_INFO,
  initialState: initialAnsimInfoSliceState,
  reducers: {
    ansimInfoAction: (state, { type, payload }) => {
      return { ...payload };
    },
  },
});

const { ansimInfoAction } = ansimInfoSlice.actions;

const selectAnsimInfo = (state: RootReducerType) => state.ansim.ansimInfo;

export { ansimInfoAction, selectAnsimInfo };

export default ansimInfoSlice.reducer;

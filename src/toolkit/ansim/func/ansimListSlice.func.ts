import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";
import { loadAnsims } from "../../../API";

interface IAnsims {
  result: number;
  msg: string;
  totalCount: number;
  list: IAnsimList[];
}

interface IAnsimList {
  rn: number;
  lcSn: number;
  bsshNm: string;
  telno: string;
  adres: string;
  etcAdres: string;
  zip: string;
  lcinfoLa: number;
  lcinfoLo: number;
  cl: string;
  clNm: string;
  scopeCd: null;
  scope: null;
  hmpg: null;
}

const getAnsimsAction = createAsyncThunk(
  `ANSIM/GET_ANSIMS_ACTION`,
  async (latlng: { lat: number; lng: number }, { rejectWithValue }) => {
    try {
      const ansims = await loadAnsims({ lat: latlng.lat, lng: latlng.lng });

      return ansims.data.data.list;
    } catch (err: any) {
      const response = err.response;
      const status = response.status;
      const data = response.data;

      return rejectWithValue({ status, ...data });
    }
  }
);

export { getAnsimsAction };

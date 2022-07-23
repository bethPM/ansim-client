import { createSlice } from "@reduxjs/toolkit";
import { RootReducerType } from "../store";

const GEO = "GEO";

const geoSlice = createSlice({
  name: GEO,
  initialState: {
    lat: 0,
    lng: 0,
  },
  reducers: {
    geoAction: (state, { type, payload }) => {
      return { ...payload };
    },
  },
});

const { geoAction } = geoSlice.actions;

const selectGeo = (state: RootReducerType) => state.geo;

export { selectGeo, geoAction };

export default geoSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";
import { LatLng } from "react-native-maps";
import { INITIAL_LAT_LNG } from "/constants";

interface InputState {
  input: string;
  position: LatLng;
}

const initialState: InputState = {
  input: "",
  position: INITIAL_LAT_LNG,
};

export const InputSlice = createSlice({
  name: "input",
  initialState,
  reducers: {
    setInput: (state, action) => {
      state.input = action.payload;
    },
  },
});

export const PositionSlice = createSlice({
  name: "position",
  initialState,
  reducers: {
    setPosition: (state, action) => {
      state.position = action.payload;
    },
  },
});

export const { setInput } = InputSlice.actions;
export const { setPosition } = PositionSlice.actions;

export const selectInput = (state: any) => state.input.input;

export const InputSliceReducer = InputSlice.reducer;
export const PositionSliceReducer = PositionSlice.reducer;

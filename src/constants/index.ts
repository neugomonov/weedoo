import { Dimensions } from "react-native";

export const { width, height } = Dimensions.get("window");
export const ASPECT_RATIO = width / height;
export const LATITUDE_DELTA = 0.02;
export const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
export const INITIAL_POSITION = {
  latitude: 34.68653706128993,
  longitude: 33.018142028949356,
  latitudeDelta: LATITUDE_DELTA,
  longitudeDelta: LONGITUDE_DELTA,
};
export const INITIAL_LAT_LNG = {
  latitude: 34.68653706128993,
  longitude: 33.018142028949356,
};

export enum DrawerState {
  Open = height - 200,
  Peek = 250,
  Closed = 0,
}

import * as Location from "expo-location";
import { LatLng } from "react-native-maps";

export const checkPermission = async () => {
  const hasPermission = await Location.requestForegroundPermissionsAsync();
  if (hasPermission.status === "granted") {
    const permission = await askPermission();
    return permission;
  }
  return true;
};
const askPermission = async () => {
  const permission = await Location.requestForegroundPermissionsAsync();
  return permission.status === "granted";
};

export const getLocation = async () => {
  const { granted } = await Location.requestForegroundPermissionsAsync();
  if (!granted) return;
  const {
    coords: { latitude, longitude },
  } = await Location.getCurrentPositionAsync();
  let currentLocation: LatLng = { latitude: latitude, longitude: longitude };
  return currentLocation;
};

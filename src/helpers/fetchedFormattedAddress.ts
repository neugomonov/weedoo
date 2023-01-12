import { LatLng } from "react-native-maps";
import Constants from "expo-constants";

export const fetchedFormattedAddress = async (place: LatLng) => {
  if (place) {
    try {
      const reverseGeocodedPlace = await fetch(
        "https://maps.googleapis.com/maps/api/geocode/json?address=" +
          place.latitude +
          "," +
          place.longitude +
          "&key=" +
          Constants!.expoConfig!.extra!.GOOGLE_API_KEY
      );
      const res = (await reverseGeocodedPlace.json()).results[0]
        .formatted_address;
      console.log(res);
      return res;
    } catch (error) {
      console.log(error);
    }
  }
};

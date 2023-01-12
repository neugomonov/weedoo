import { LatLng } from "react-native-maps";

export const fetchedFormattedAddress = async (place: LatLng) => {
  if (place) {
    let reverseGeocodedPlace = await fetch(
      "https://maps.googleapis.com/maps/api/geocode/json?address=" +
        place.latitude +
        "," +
        place.longitude +
        "&key=" +
        process.env.GOOGLE_API_KEY
    );
    const res = (await reverseGeocodedPlace.json()).results[0]
      .formatted_address;
    return res;
  }
};

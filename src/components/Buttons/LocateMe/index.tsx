import Navigate from "/assets/navigate.svg";
import { getLocation } from "/helpers/locationPermission";
import React, { useContext, useState } from "react";
import { TouchableOpacity, View } from "react-native";
import { LatLng } from "react-native-maps";
import { fetchedFormattedAddress } from "/helpers/fetchedFormattedAddress";
import { PlaceContext, placeStateType } from "/components/Context";

export const LocateMe = () => {
  // const [place, setPlace] = useState<LatLng | null>();
  const placeState: placeStateType = useContext(PlaceContext);
  const onNavigatePress = () => {
    getLocation();
    console.log(
      "🚀 ~ file: index.tsx:17 ~ onNavigatePress ~ getLocation()",
      getLocation()._z
    );
    placeState.setPlace(async () => await getLocation());
    console.log(placeState.place);
    console.log(fetchedFormattedAddress(placeState.place));
    // moveTo(currentLocation!);
  };
  return (
    <View
      style={{
        position: "absolute",
        top: "70%",
        left: "90%",
        marginRight: 20,
      }}
    >
      <TouchableOpacity onPress={() => onNavigatePress()}>
        <Navigate width={32} fill="#F2994A" style={{ flex: 1 }} />
      </TouchableOpacity>
    </View>
  );
};

export default LocateMe;

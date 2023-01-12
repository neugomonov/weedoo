import React, { FC, useContext, useEffect } from "react";
import { TouchableOpacity, View } from "react-native";
import Navigate from "/assets/icons/navigate.svg";
import {
  PlaceContext,
  placeStateType,
  reverseGeocodedPlaceStateType,
} from "/components/Context";
import { fetchedFormattedAddress } from "/helpers/fetchedFormattedAddress";
import { getLocation } from "/helpers/locationPermission";

export const LocateMe: FC = () => {
  // @ts-expect-error - Object is of type 'unknown'.ts(2571)
  const placeState: placeStateType = useContext(PlaceContext)[0];
  const reverseGeocodedPlaceState: reverseGeocodedPlaceStateType =
    // @ts-expect-error - Object is of type 'unknown'.ts(2571)
    useContext(PlaceContext)[1];
  const onNavigatePress = async () => {
    const getLocationRes = await getLocation();
    const fetchedFormattedAddressRes = await fetchedFormattedAddress(
      getLocationRes
    );
    placeState.setPlace(getLocationRes);
    reverseGeocodedPlaceState.setReverseGeocodedPlace(
      fetchedFormattedAddressRes
    );
  };
  useEffect(() => {
    fetchedFormattedAddress(placeState.place);
  }, [placeState.place]);
  return (
    <View
      style={{
        position: "absolute",
        top: "55%",
        left: "90%",
        marginRight: 20,
      }}
    >
      <TouchableOpacity onPress={async () => await onNavigatePress()}>
        <Navigate width={32} fill="#F2994A" style={{ flex: 1 }} />
      </TouchableOpacity>
    </View>
  );
};

export default LocateMe;

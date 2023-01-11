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

export type LocateMeProps = {
  moveTo: () => void;
};

export const LocateMe: FC<LocateMeProps> = (props) => {
  const { moveTo } = props;
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
    // ! moveTo(getLocationRes);
    console.log(
      "🚀 ~ file: index.tsx:17 ~ onNavigatePress ~ getLocation()",
      await getLocation()
    );
    console.log(
      "🚀 ~ file: index.tsx:22 ~ onNavigatePress ~ reverseGeocodedPlaceState.reverseGeocodedPlace",
      fetchedFormattedAddressRes
    );
  };
  useEffect(() => {
    console.log("There's the place: ", placeState.place);
    fetchedFormattedAddress(placeState.place);
    const getFetchedFormattedAddress = async () =>
      console.log(
        "🚀 ~ file: App.tsx:49 ~ useEffect ~ fetchedFormattedAddress",
        await fetchedFormattedAddress(placeState.place)
      );
    getFetchedFormattedAddress();
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

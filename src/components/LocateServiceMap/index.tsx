import React, { useContext, useEffect, useRef } from "react";
import { Dimensions } from "react-native";
import Constants from "expo-constants";
import MapView, {
  LatLng,
  MapPressEvent,
  MarkerDragStartEndEvent,
  PROVIDER_GOOGLE,
} from "react-native-maps";
import {
  PlaceContext,
  placeStateType,
  reverseGeocodedPlaceStateType,
} from "/components/Context";
import { LocationMarker } from "/components/LocationMarker";
import { INITIAL_POSITION } from "/constants";
import { fetchedFormattedAddress } from "/helpers/fetchedFormattedAddress";

export type LocateServiceMapProps = {
  textValue: string;
};

export type LocateServiceMap = {
  onPlaceSelected: LocateServiceMapProps["onPlaceSelected"];
};

export const LocateServiceMap = () => {
  const mapRef = useRef<MapView>(null);
  // @ts-expect-error - Object is of type 'unknown'.ts(2571)
  const placeState: placeStateType = useContext(PlaceContext)[0];
  const reverseGeocodedPlaceState: reverseGeocodedPlaceStateType =
    // @ts-expect-error - Object is of type 'unknown'.ts(2571)
    useContext(PlaceContext)[1];
  const onMapViewPress = async (e: MapPressEvent) => {
    placeState.setPlace(e.nativeEvent.coordinate);
    const fetchedFormattedAddressRes = await fetchedFormattedAddress(
      e.nativeEvent.coordinate
    );
    reverseGeocodedPlaceState.setReverseGeocodedPlace(
      fetchedFormattedAddressRes
    );
  };
  const onLocationMarkerDragEndHandler = async (e: MarkerDragStartEndEvent) => {
    placeState.setPlace(e.nativeEvent.coordinate);
    const fetchedFormattedAddressRes = await fetchedFormattedAddress(
      e.nativeEvent.coordinate
    );
    reverseGeocodedPlaceState.setReverseGeocodedPlace(
      fetchedFormattedAddressRes
    );
  };
  const moveTo = async (position: LatLng) => {
    const camera = await mapRef.current?.getCamera();
    if (camera) {
      camera.center = position;
      mapRef.current?.animateCamera(camera, { duration: 1000 });
    }
  };
  return (
    <MapView
      ref={mapRef}
      style={{
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height,
        marginTop: Constants.statusBarHeight + 50,
      }}
      provider={PROVIDER_GOOGLE}
      initialRegion={INITIAL_POSITION}
      showsUserLocation={true}
      followsUserLocation={true}
      onPress={(e: MapPressEvent) => {
        onMapViewPress(e);
        moveTo(e.nativeEvent.coordinate);
      }}
    >
      {placeState.place ? (
        <LocationMarker
          coordinate={placeState.place}
          onDragEnd={(e: MarkerDragStartEndEvent) => {
            onLocationMarkerDragEndHandler(e);
            moveTo(e.nativeEvent.coordinate);
          }}
        />
      ) : null}
    </MapView>
  );
};

export default LocateServiceMap;

import { LocationMarker } from "/components/LocationMarker";
import React, { useContext } from "react";
import { FC, useCallback, useEffect, useRef, useState } from "react";
import { Dimensions } from "react-native";
import MapView, {
  LatLng,
  MapPressEvent,
  MarkerDragStartEndEvent,
  PROVIDER_GOOGLE,
} from "react-native-maps";
import { INITIAL_POSITION, INITIAL_LAT_LNG } from "/constants";
// ? import { fetchedFormattedAddress } from "helpers/fetchedFormattedAddress"; - this is the autocompleted variant. It works with tsconfig, but babel doesn't understand. 🤔
import { fetchedFormattedAddress } from "/helpers/fetchedFormattedAddress";
import {
  PlaceContext,
  placeStateType,
  reverseGeocodedPlaceStateType,
} from "/components/Context";

export type LocateServiceMapProps = {
  textValue: string;
};

export type LocateServiceMap = {
  onPlaceSelected: LocateServiceMapProps["onPlaceSelected"];
};

export const LocateServiceMap = () => {
  const mapRef = useRef<MapView>(null);
  // ! helpers moveTo
  // ! constants constants
  // const [place, setPlace] = useState<LatLng>(INITIAL_LAT_LNG);
  const placeState: placeStateType = useContext(PlaceContext)[0];
  const reverseGeocodedPlaceState: reverseGeocodedPlaceStateType =
    useContext(PlaceContext)[1];
  useEffect(() => {
    // moveTo(placeState.place);
    // reverseGeocodedPlaceState.setReverseGeocodedPlace(
    //   fetchedFormattedAddress(placeState.place)
    // );
    return () => {};
  }, [placeState.place]);
  const onMapViewPress = (e: MapPressEvent) => {
    placeState.setPlace(e.nativeEvent.coordinate);
    // reverseGeocodedPlaceState.setReverseGeocodedPlace(
    //   fetchedFormattedAddress(placeState.place)
    // );
    moveTo(placeState.place);
    console.log("🌎 onMapViewPress ", placeState.place);
  };
  const onLocationMarkerDragEndHandler = (e: MarkerDragStartEndEvent) => {
    placeState.setPlace(e.nativeEvent.coordinate);
    // reverseGeocodedPlaceState.setReverseGeocodedPlace(
    //   fetchedFormattedAddress(placeState.place)
    // );
    moveTo(placeState.place);
    console.log("📍 onLocationMarkerDragEndHandler ", placeState.place);
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
      }}
      provider={PROVIDER_GOOGLE}
      initialRegion={INITIAL_POSITION}
      showsUserLocation={true}
      followsUserLocation={true}
      onPress={(e: MapPressEvent) => {
        onMapViewPress(e);
      }}
    >
      {/* {place || currentLocation ? ( */}
      {placeState.place ? (
        <LocationMarker
          // coordinate={place ? place : currentLocation!}
          coordinate={placeState.place}
          onDragEnd={(e: MarkerDragStartEndEvent) => {
            onLocationMarkerDragEndHandler(e);
          }}
        />
      ) : null}
    </MapView>
  );
};

export default LocateServiceMap;

import React, { useContext, useRef } from "react";
import { Dimensions } from "react-native";
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

export type LocateServiceMapProps = {
  textValue: string;
};

export type LocateServiceMap = {
  onPlaceSelected: LocateServiceMapProps["onPlaceSelected"];
};

export const LocateServiceMap = () => {
  const mapRef = useRef<MapView>(null);
  const placeState: placeStateType = useContext(PlaceContext)[0];
  const reverseGeocodedPlaceState: reverseGeocodedPlaceStateType =
    useContext(PlaceContext)[1];
  const onMapViewPress = (e: MapPressEvent) => {
    placeState.setPlace(e.nativeEvent.coordinate);
    moveTo(placeState.place);
    console.log("🌎 onMapViewPress ", placeState.place);
  };
  const onLocationMarkerDragEndHandler = (e: MarkerDragStartEndEvent) => {
    placeState.setPlace(e.nativeEvent.coordinate);
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
      {placeState.place ? (
        <LocationMarker
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

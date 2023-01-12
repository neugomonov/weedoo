import Constants from "expo-constants";
import React, { useContext, useEffect, useRef } from "react";
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
import { fetchedFormattedAddress } from "/helpers/fetchedFormattedAddress";

export const LocateServiceMap = () => {
  const mapRef = useRef<MapView>(null);
  const moveTo = async (position: LatLng) => {
    try {
      const camera = await mapRef.current?.getCamera();
      if (camera) {
        camera.center = position;
        mapRef.current?.animateCamera(camera, { duration: 1000 });
      }
    } catch (error) {
      console.log(error);
    }
  };
  // @ts-expect-error - Object is of type 'unknown'.ts(2571)
  const placeState: placeStateType = useContext(PlaceContext)[0];
  const reverseGeocodedPlaceState: reverseGeocodedPlaceStateType =
    // @ts-expect-error - Object is of type 'unknown'.ts(2571)
    useContext(PlaceContext)[1];
  useEffect(() => {
    moveTo(placeState.place);
  }, [placeState.place]);
  const onMapViewPress = async (e: MapPressEvent) => {
    try {
      placeState.setPlace(e.nativeEvent.coordinate);
      const fetchedFormattedAddressRes = await fetchedFormattedAddress(
        e.nativeEvent.coordinate
      );
      reverseGeocodedPlaceState.setReverseGeocodedPlace(
        fetchedFormattedAddressRes
      );
    } catch (error) {
      console.log(error);
    }
  };
  const onLocationMarkerDragEndHandler = async (e: MarkerDragStartEndEvent) => {
    try {
      placeState.setPlace(e.nativeEvent.coordinate);
      const fetchedFormattedAddressRes = await fetchedFormattedAddress(
        e.nativeEvent.coordinate
      );
      reverseGeocodedPlaceState.setReverseGeocodedPlace(
        fetchedFormattedAddressRes
      );
    } catch (error) {
      console.log(error);
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
      showsMyLocationButton={false}
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

LocateServiceMap.displayName = "LocateServiceMap";

export default LocateServiceMap;

import MarkerIcon from "assets/icons/marker.svg";
import React, { FC, useEffect, useRef, useState } from "react";
import { Platform } from "react-native";
import {
  AnimatedRegion,
  LatLng,
  MarkerAnimated,
  MarkerDragStartEndEvent,
} from "react-native-maps";

export type LocationMarkerProps = {
  coordinate: LatLng;
  onDragEnd: (event: MarkerDragStartEndEvent) => void;
};

export const LocationMarker: FC<LocationMarkerProps> = (props) => {
  const { coordinate, onDragEnd } = props;
  const duration = 1000;
  // @ts-expect-error - 'MarkerAnimated' refers to a value, but is being used as a type here. Did you mean 'typeof MarkerAnimated'?ts(2749)
  const markerRef = useRef<MarkerAnimated>(null);
  const [coords] = useState<AnimatedRegion>(
    new AnimatedRegion({
      latitude: coordinate.latitude,
      longitude: coordinate.longitude,
      latitudeDelta: 0,
      longitudeDelta: 0,
    })
  );
  useEffect(() => {
    if (Platform.OS === "android") {
      if (markerRef.current) {
        markerRef.current.animateMarkerToCoordinate(coordinate, duration);
      }
    } else {
      coords
        .timing({
          toValue: 1,
          latitude: coordinate.latitude,
          longitude: coordinate.longitude,
          latitudeDelta: 0,
          longitudeDelta: 0,
          duration,
          useNativeDriver: true,
        })
        .start();
    }
  }, [markerRef, coordinate, coords]);
  return (
    <MarkerAnimated
      coordinate={coordinate}
      ref={markerRef}
      draggable
      onDragEnd={onDragEnd}
      opacity={0.9}
    >
      <MarkerIcon width={36} fill="#FE7E4E" style={{ flex: 1 }} />
    </MarkerAnimated>
  );
};

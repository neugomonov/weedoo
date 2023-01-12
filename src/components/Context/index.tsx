import React, { useState } from "react";
import { LatLng } from "react-native-maps";
import { INITIAL_LAT_LNG } from "/constants";

export const PlaceContext = React.createContext({
  place: INITIAL_LAT_LNG,
  setPlace: (place: LatLng) => {},
});

export type placeStateType = {
  place: LatLng;
  setPlace: (place: LatLng) => void;
};

export type reverseGeocodedPlaceStateType = {
  reverseGeocodedPlace: string;
  setReverseGeocodedPlace: (reverseGeocodedPlace: string) => void;
};

export const PlaceContextProvider = (props: any) => {
  const setPlace = (place: LatLng) => {
    setPlaceState({ ...placeState, place: place });
  };
  const setReverseGeocodedPlace = (reverseGeocodedPlace: string) => {
    setReverseGeocodedPlaceState({
      ...reverseGeocodedPlaceState,
      reverseGeocodedPlace: reverseGeocodedPlace,
    });
  };

  const initPlaceState = {
    place: INITIAL_LAT_LNG,
    setPlace: setPlace,
  };
  const initReverseGeocodedPlaceState = {
    reverseGeocodedPlace: "",
    setReverseGeocodedPlace: setReverseGeocodedPlace,
  };
  const [placeState, setPlaceState] = useState(initPlaceState);
  const [reverseGeocodedPlaceState, setReverseGeocodedPlaceState] = useState(
    initReverseGeocodedPlaceState
  );
  return (
    // @ts-expect-error - Type '({ place: any; setPlace: (place: LatLng) => void; } | { reverseGeocodedPlace: string; setReverseGeocodedPlace: (reverseGeocodedPlace: string) => void; })[]' is missing the following properties from type '{ place: any; setPlace: (place: LatLng) => void; }': place, setPlacets(2739) index.d.ts(329, 9): The expected type comes from property 'value' which is declared here on type 'IntrinsicAttributes & ProviderProps<{ place: any; setPlace: (place: LatLng) => void; }>'
    <PlaceContext.Provider value={[placeState, reverseGeocodedPlaceState]}>
      {props.children}
    </PlaceContext.Provider>
  );
};

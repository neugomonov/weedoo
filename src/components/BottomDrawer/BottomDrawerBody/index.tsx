import MarkerIcon from "/assets/icons/marker.svg";
import { PrimaryButton } from "/components/Buttons/PrimaryButton";
import { InputWithAutocompleteAndLiner } from "/components/InputWithAutocompleteAndLiner";
import { GooglePlaceDetail } from "/components/MapsAutocomplete";
import React, { useContext, useEffect, useState } from "react";
import { Text, View } from "react-native";
import { LatLng } from "react-native-maps";
import { styles } from "./index.styles";
import { fetchedFormattedAddress } from "/helpers/fetchedFormattedAddress";
import {
  PlaceContext,
  placeStateType,
  reverseGeocodedPlaceStateType,
} from "/components/Context";

const BottomDrawerBody = () => {
  // const [reverseGeocodedPlace, setReverseGeocodedPlace] = useState("");
  const reverseGeocodedPlaceState: reverseGeocodedPlaceStateType =
    useContext(PlaceContext)[1];

  // const [place, setPlace] = useState<LatLng | null>();
  const placeState: placeStateType = useContext(PlaceContext);
  // hahah recursion
  // useEffect(() => {
  //   setReverseGeocodedPlace(fetchedFormattedAddress(place));
  // }, [fetchedFormattedAddress(), place]);
  const onPlaceSelected = (details: GooglePlaceDetail | null) => {
    const position = {
      latitude: details?.geometry.location.lat || 0,
      longitude: details?.geometry.location.lng || 0,
    };
    fetchedFormattedAddress(position);
    placeState.setPlace(position);
    moveTo(position);
  };
  const onPrimaryButtonPress = async () => {
    fetchedFormattedAddress(placeState.place);
    reverseGeocodedPlaceState.setReverseGeocodedPlace(
      await fetchedFormattedAddress(placeState.place)
    );
    console.log(
      `🌎 Адрес текстом: "${
        reverseGeocodedPlaceState.reverseGeocodedPlace
      }" + 📍 Координаты: "${
        placeState.place
          ? JSON.stringify(placeState.place)
          : JSON.stringify(placeState.place)
      }" `
    );
    // console.log(
    //   `🌎 Адрес текстом: "${reverseGeocodedPlace}" + 📍 Координаты: "${
    //     place ? JSON.stringify(place) : JSON.stringify(currentPosition or something i don't remember)
    //   }" `
    // );
  };
  return (
    <View style={styles.bottomDrawerWrapper}>
      <View style={styles.linkAddress}>
        <MarkerIcon width={36} fill="#87A3DD" style={{ flex: 1 }} />
        <Text style={styles.baseText}>
          {reverseGeocodedPlaceState.reverseGeocodedPlace}
        </Text>
      </View>
      {
        // TODO: There 👇 I should put a label tag for the semantic purposes. It'll need to be dealt with later on
      }
      <Text style={styles.accentText}>Поиск</Text>
      <View style={styles.bottomDrawerWrapperCentered}>
        <InputWithAutocompleteAndLiner onPlaceSelected={onPlaceSelected} />
        <PrimaryButton
          title={"Готово"}
          onPress={async () => await onPrimaryButtonPress()}
        />
      </View>
    </View>
  );
};

export default BottomDrawerBody;

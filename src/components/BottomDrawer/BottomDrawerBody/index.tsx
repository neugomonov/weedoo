import React, { useContext } from "react";
import { Text, View } from "react-native";
import { styles } from "./index.styles";
import MarkerIcon from "/assets/icons/marker.svg";
import { PrimaryButton } from "/components/Buttons/PrimaryButton";
import {
  PlaceContext,
  placeStateType,
  reverseGeocodedPlaceStateType,
} from "/components/Context";
import { InputWithAutocompleteAndLiner } from "/components/InputWithAutocompleteAndLiner";
import { GooglePlaceDetail } from "/components/MapsAutocomplete";
import { fetchedFormattedAddress } from "/helpers/fetchedFormattedAddress";

const BottomDrawerBody = () => {
  const reverseGeocodedPlaceState: reverseGeocodedPlaceStateType =
    useContext(PlaceContext)[1];
  const placeState: placeStateType = useContext(PlaceContext)[0];
  const onPlaceSelected = async (details: GooglePlaceDetail | null) => {
    const position = {
      latitude: details?.geometry.location.lat || 0,
      longitude: details?.geometry.location.lng || 0,
    };
    fetchedFormattedAddress(position);
    placeState.setPlace(position);
    reverseGeocodedPlaceState.setReverseGeocodedPlace(
      await fetchedFormattedAddress(placeState.place)
    );
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

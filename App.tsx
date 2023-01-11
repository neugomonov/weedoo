import { NavigationContainer } from "@react-navigation/native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { View } from "react-native";
import Geocoder from "react-native-geocoding";
import { LatLng } from "react-native-maps";
import { styles } from "./App.styles";
import { GOOGLE_API_KEY } from "./src/environments";
import { BottomDrawer } from "/components/BottomDrawer";
import BottomDrawerBody from "/components/BottomDrawer/BottomDrawerBody";
import { LocateMe } from "/components/Buttons/LocateMe";
import {
  PlaceContext,
  PlaceContextProvider,
  placeStateType,
  reverseGeocodedPlaceStateType,
} from "/components/Context";
import { Header } from "/components/Header";
import { LocateServiceMap } from "/components/LocateServiceMap";
import { fetchedFormattedAddress } from "/helpers/fetchedFormattedAddress";
import { checkPermission, getLocation } from "/helpers/locationPermission";
import { onDrawerStateChange } from "/helpers/onDrawerStateChange";

Geocoder.init(GOOGLE_API_KEY);

function App() {
  const placeState: placeStateType = useContext(PlaceContext);
  const reverseGeocodedPlaceState: reverseGeocodedPlaceStateType =
    // @ts-expect-error - Object is of type 'unknown'.ts(2571)
    useContext(PlaceContext)[1];
  useEffect(() => {
    checkPermission();
    const getCurrentLocation = async () => {
      console.log("accessing currentLocation from App ", await getLocation());
    };
    getCurrentLocation();
    setCurrentLocation(getLocation());
    console.log("There's the currentLocation ", currentLocation);
  }, []);
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
  const [currentLocation, setCurrentLocation] = useState<LatLng | null>();
  const [fontsLoaded] = useFonts({
    "Montserrat-ExtraBold": require("assets/fonts/Montserrat-ExtraBold.ttf"),
    "Montserrat-Medium": require("assets/fonts/Montserrat-Medium.ttf"),
    "Montserrat-SemiBold": require("assets/fonts/Montserrat-SemiBold.ttf"),
  });
  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);
  if (!fontsLoaded) {
    return null;
  }
  return (
    <PlaceContextProvider>
      <NavigationContainer>
        <View style={styles.container} onLayout={onLayoutRootView}>
          <LocateServiceMap />
          <LocateMe />
          <Header title={"Адрес"} />
          {
            //TODO: add overlay on drawer opened position >~60%
          }
          <BottomDrawer onDrawerStateChange={onDrawerStateChange}>
            <BottomDrawerBody />
          </BottomDrawer>
        </View>
      </NavigationContainer>
    </PlaceContextProvider>
  );
}

export default App;

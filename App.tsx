import { NavigationContainer } from "@react-navigation/native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import React, { useCallback, useContext, useEffect } from "react";
import { View } from "react-native";
import Geocoder from "react-native-geocoding";
import { styles } from "./App.styles";
import { BottomDrawer } from "/components/BottomDrawer";
import BottomDrawerBody from "/components/BottomDrawer/BottomDrawerBody";
import { LocateMe } from "/components/Buttons/LocateMe";
import {
  PlaceContext,
  PlaceContextProvider,
  placeStateType,
} from "/components/Context";
import { Header } from "/components/Header";
import { LocateServiceMap } from "/components/LocateServiceMap";
import { fetchedFormattedAddress } from "/helpers/fetchedFormattedAddress";
import { checkPermission } from "/helpers/locationPermission";
import { onDrawerStateChange } from "/helpers/onDrawerStateChange";

Geocoder.init(process.env.GOOGLE_API_KEY);

function App() {
  const placeState: placeStateType = useContext(PlaceContext);
  useEffect(() => {
    checkPermission();
  }, []);
  useEffect(() => {
    fetchedFormattedAddress(placeState.place);
  }, [placeState.place]);
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

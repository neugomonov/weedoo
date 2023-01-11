import { BottomDrawer } from "/components/BottomDrawer";
import BottomDrawerBody from "/components/BottomDrawer/BottomDrawerBody";
import { LocateMe } from "/components/Buttons/LocateMe";
import { Header } from "/components/Header";
import { LocateServiceMap } from "/components/LocateServiceMap";
import { onDrawerStateChange } from "/helpers/onDrawerStateChange";
import store from "/redux/store";
import { NavigationContainer } from "@react-navigation/native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { View } from "react-native";
import Geocoder from "react-native-geocoding";
import { LatLng } from "react-native-maps";
import { Provider as ReduxProvider } from "react-redux";
import { styles } from "./App.styles";
import { GOOGLE_API_KEY } from "./src/environments";
import { checkPermission, getLocation } from "/helpers/locationPermission";
import { fetchedFormattedAddress } from "/helpers/fetchedFormattedAddress";
import {
  PlaceContext,
  PlaceContextProvider,
  placeStateType,
} from "/components/Context";

Geocoder.init(GOOGLE_API_KEY);

const AppWrapper = () => {
  return (
    <ReduxProvider store={store}>
      <App />
    </ReduxProvider>
  );
};

function App() {
  const placeState: placeStateType = useContext(PlaceContext);
  const inputRef = useRef();
  // const [place, setPlace] = useState<LatLng | null>();
  useEffect(() => {
    checkPermission();
    const getCurrentLocation = async () => {
      console.log("accessing currentLocation from App ", await getLocation());
    };
    getCurrentLocation();
    setCurrentLocation(getLocation());
    console.log("There's the currentLocation ", currentLocation);
  }, []);
  // ! helpers fetchedFormattedAddress
  useEffect(() => {
    console.log("There's the place: ", placeState.place);
    console.log();
    fetchedFormattedAddress();
    console.log(
      "🚀 ~ file: App.tsx:49 ~ useEffect ~ fetchedFormattedAddress",
      fetchedFormattedAddress()
    );
  }, [placeState.place]);
  // ! helpers checkPermission askPermission
  const [currentLocation, setCurrentLocation] = useState<LatLng | null>();
  // ! helpers getLocation
  const [reverseGeocodedPlace, setReverseGeocodedPlace] = useState(null);
  // ! helpers onDrawerStateChange
  // ! helpers fonts ?
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

export default AppWrapper;

import { StyleSheet } from "react-native";
import Constants from "expo-constants";

export const styles = StyleSheet.create({
  titleText: {
    fontSize: 20,
    fontFamily: "Montserrat-ExtraBold",
    flex: 1,
    paddingRight: 33,
    textAlign: "center",
    justifyContent: "center",
  },
  titleWrapper: {
    paddingTop: Constants.statusBarHeight,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    position: "absolute",
    top: 0,
    backgroundColor: "white",
    left: 0,
    height: 102,
    width: "100%",
    borderRadius: 16,
    overflow: "hidden",
  },
});

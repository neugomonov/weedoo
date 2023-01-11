import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  baseText: {
    fontSize: 14,
    fontFamily: "Montserrat-Medium",
    marginLeft: 15.5,
    width: "80%",
    textDecorationLine: "underline",
    lineHeight: 16,
    textDecorationStyle: "solid",
    textUnderlinePosition: "under",
  },
  accentText: {
    fontSize: 16,
    fontFamily: "Montserrat-SemiBold",
    marginLeft: 39.5,
    marginTop: 17,
    marginBottom: 4,
  },
  bottomDrawerWrapper: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    paddingTop: 6,
    paddingHorizontal: 15,
    paddingVertical: 100,
    gap: "100px",
    gapWidth: 100,
  },
  bottomDrawerWrapperCentered: {
    alignItems: "center",
  },
  linkAddress: {
    flexDirection: "row",
    alignItems: "center",
  },
});

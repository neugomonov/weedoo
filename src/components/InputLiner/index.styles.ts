import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  input: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: "10px",
    // TODO: no magic numbers please 🥺
    width: "90%",
    height: 48,
    background: "#F5F8FE",
    flex: 0,
    order: 0,
    flexGrow: 0,
  },
  inputShadow: {
    width: 343,
    height: 48,
    borderRadius: 24,
    marginBottom: 34,
  },
});

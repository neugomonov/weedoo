import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import Search from "assets/icons/search.svg";
import { styles } from "./index.styles";

const SuggestionRow = ({ item }) => {
  useEffect(() => {
    // console.log(item);
    return () => {};
  });
  const title = item.structured_formatting.main_text;
  const address = item.structured_formatting.secondary_text;
  const type = item.types[0];
  // console.log(item.structured_formatting);
  // console.log(item);
  return (
    <View style={styles.row}>
      <View style={styles.iconContainer}>
        <Search width={19} style={{ flex: 1 }} />
      </View>
      <View>
        <Text style={styles.locationText}>{item.description}</Text>
        <Text style={styles.locationTextSecondary}>{type}</Text>
      </View>
    </View>
  );
};

export default SuggestionRow;

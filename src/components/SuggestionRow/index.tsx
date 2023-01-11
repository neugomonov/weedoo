import React, { useEffect } from "react";
import { Text, View } from "react-native";
import { styles } from "./index.styles";
import Search from "/assets/icons/search.svg";

const SuggestionRow = ({ item }) => {
  const title = item.structured_formatting.main_text;
  const address = item.structured_formatting.secondary_text;
  const type = item.types[0];
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

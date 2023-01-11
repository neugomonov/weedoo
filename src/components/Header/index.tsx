import ArrowBack from "assets/arrow-back.svg";
import { Text } from "@rneui/themed";
import React, { FC } from "react";
import { TouchableOpacity, View } from "react-native";
import { styles } from "./index.styles";

export type HeaderProps = {
  title: string;
};

export const Header: FC<HeaderProps> = (props) => {
  const { title } = props;
  return (
    <View style={styles.titleWrapper}>
      <TouchableOpacity>
        <ArrowBack width={24} style={{ flex: 1, marginLeft: 9 }} />
      </TouchableOpacity>
      <Text style={styles.titleText}>{title}</Text>
    </View>
  );
};
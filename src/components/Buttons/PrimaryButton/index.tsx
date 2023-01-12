import { Button } from "@rneui/themed";
import { LinearGradient } from "expo-linear-gradient";
import React, { FC } from "react";
import { GestureResponderEvent } from "react-native";

export type PrimaryButtonProps = {
  title: string;
  onPress: (event: GestureResponderEvent) => void;
};

export const PrimaryButton: FC<PrimaryButtonProps> = (props) => {
  const { title, onPress } = props;
  return (
    <Button
      title={title}
      onPress={onPress}
      buttonStyle={{
        borderRadius: 28,
      }}
      containerStyle={{
        width: 343,
        height: 56,
      }}
      size="lg"
      titleStyle={{
        fontFamily: "Montserrat-ExtraBold",
        fontSize: 16,
      }}
      ViewComponent={LinearGradient}
      linearGradientProps={{
        colors: ["#FF9800", "#FE873E"],
        start: { x: 0.5, y: 0 },
        end: { x: 0.5, y: 1 },
      }}
      style={{ width: 343, height: 56 }}
    />
  );
};

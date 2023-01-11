import { MapsAutocompleteRef } from "/components/MapsAutocomplete";
import { Input } from "@rneui/themed";
import Close from "/assets/close.svg";
import Search from "/assets/search.svg";
import React from "react";
import { TouchableOpacity } from "react-native";
import InsetShadow from "react-native-inset-shadow";
import { styles } from "./index.styles";

export type InputLinerProps = {
  value?: string;
  onChange?: (value: string) => void;
  clearIcon: boolean;
};

export const InputLiner = React.forwardRef<
  MapsAutocompleteRef,
  InputLinerProps
>((props, ref) => {
  const { clearIcon, value, onChange } = props;
  const clearHandler = () => {
    ref?.current?.setAddressText("");
  };
  return (
    <InsetShadow
      containerStyle={styles.inputShadow}
      shadowColor="#000000"
      shadowOpacity={0.5}
      shadowRadius={10}
      elevation={10}
    >
      <Input
        placeholder=""
        value={value}
        style={styles.input}
        onChangeText={onChange}
        disabled
        rightIcon={
          clearIcon === false ? (
            <Search width={19} style={{ flex: 1 }} />
          ) : (
            <TouchableOpacity onPress={clearHandler}>
              <Close width={19} style={{ flex: 1 }} />
            </TouchableOpacity>
          )
        }
      />
    </InsetShadow>
  );
});

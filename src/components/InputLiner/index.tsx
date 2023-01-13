import { Input } from "@rneui/themed";
import React from "react";
import { TouchableOpacity } from "react-native";
import InsetShadow from "react-native-inset-shadow";
import { styles } from "./index.styles";
import Close from "/assets/icons/close.svg";
import Search from "/assets/icons/search.svg";
import { MapsAutocompleteRef } from "/components/MapsAutocomplete";

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
    // @ts-expect-error - Property 'current' does not exist on type '((instance: any) => void) | MutableRefObject<any>'. Property 'current' does not exist on type '(instance: any) => void'.ts(2339)
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

InputLiner.displayName = "InputLiner";

import { Text } from "@rneui/themed";
import React from "react";
import { styles } from "./index.styles";
import {
  GooglePlaceDetail,
  MapsAutocomplete,
  MapsAutocompleteProps,
  MapsAutocompleteRef,
} from "/components/MapsAutocomplete";
import SuggestionRow from "/components/SuggestionRow";

export type InputWithAutocompleteProps = {
  textValue: string;
  onPlaceSelected: (details: GooglePlaceDetail | null) => void;
  setClearIcon: React.Dispatch<React.SetStateAction<boolean>>;
};

export const InputWithAutocomplete = React.forwardRef<
  MapsAutocompleteRef,
  InputWithAutocompleteProps
>((props, ref) => {
  const { onPlaceSelected, setClearIcon } = props;
  const pressHandler: MapsAutocompleteProps["onPress"] = (
    _: any,
    details = null
  ) => {
    onPlaceSelected(details);
  };
  return (
    <>
      <MapsAutocomplete
        ref={ref}
        placeholder={"Где?"}
        fetchDetails
        onPress={pressHandler}
        query={{
          key: process.env.GOOGLE_API_KEY,
          language: "en",
        }}
        listEmptyComponent={() => (
          <Text h4 style={styles.textNotFound}>
            Не могу найти такого места. Может, попробовать выбрать его на карте?
            🤔
          </Text>
        )}
        suppressDefaultStyles
        debounce={200}
        renderRow={(item: any) => <SuggestionRow item={item} />}
        styles={styles}
        textInputProps={{
          onFocus: () => setClearIcon(true),
          onBlur: () => setClearIcon(false),
        }}
      />
    </>
  );
});

InputWithAutocomplete.displayName = "InputWithAutocomplete";

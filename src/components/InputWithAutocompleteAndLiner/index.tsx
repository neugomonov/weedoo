import { InputLiner } from "/components/InputLiner";
import {
  InputWithAutocomplete,
  InputWithAutocompleteProps,
} from "/components/InputWithAutocomplete";
import React, { FC, useRef, useState } from "react";

export type InputWithAutocompleteAndLinerProps = {
  onPlaceSelected: InputWithAutocompleteProps["onPlaceSelected"];
};

export const InputWithAutocompleteAndLiner: FC<
  InputWithAutocompleteAndLinerProps
> = (props) => {
  const { onPlaceSelected } = props;
  const [text, setText] = useState("");
  const [clearIcon, setClearIcon] = useState(false);
  const ref = useRef();
  return (
    <>
      <InputLiner
        ref={ref}
        value={text}
        onChange={setText}
        clearIcon={clearIcon}
      />
      <InputWithAutocomplete
        ref={ref}
        textValue={text}
        onPlaceSelected={onPlaceSelected}
        setClearIcon={setClearIcon}
      />
    </>
  );
};

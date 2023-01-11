import { animateMove, getNextState } from "/helpers/drawer";
import { DrawerState } from "/constants";
import React, { FC, useRef } from "react";
import {
  Animated,
  Dimensions,
  GestureResponderEvent,
  PanResponder,
  PanResponderGestureState,
} from "react-native";
import { HorizontalLine } from "./index.styles";

type BottomDrawerProps = {
  children?: React.ReactNode;
  onDrawerStateChange: (nextState: DrawerState) => void;
};

export const BottomDrawer: FC<BottomDrawerProps> = (props) => {
  const { children, onDrawerStateChange } = props;
  const { height } = Dimensions.get("window");
  const y = React.useRef(new Animated.Value(DrawerState.Closed)).current;
  const state = React.useRef(new Animated.Value(DrawerState.Closed)).current;
  const margin = 0.05 * height;
  const movementValue = (moveY: number) => height - moveY;
  const onPanResponderMove = (
    _: GestureResponderEvent,
    { moveY }: PanResponderGestureState
  ) => {
    const val = movementValue(moveY);
    animateMove(y, val);
  };
  const onPanResponderRelease = (
    _: GestureResponderEvent,
    { moveY }: PanResponderGestureState
  ) => {
    const valueToMove = movementValue(moveY);
    const nextState = getNextState(state._value, valueToMove, margin);
    state.setValue(nextState);
    animateMove(y, nextState, onDrawerStateChange(nextState));
  };
  const onMoveShouldSetPanResponder = (
    _: GestureResponderEvent,
    { dy }: PanResponderGestureState
  ) => Math.abs(dy) >= 10;
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder,
      onStartShouldSetPanResponderCapture: onMoveShouldSetPanResponder,
      onPanResponderMove,
      onPanResponderRelease,
    })
  ).current;
  return (
    <Animated.View
      style={[
        {
          width: "100%",
          height: height,
          backgroundColor: "#fff",
          borderRadius: 24,
          position: "absolute",
          bottom: -height + 30,
          transform: [{ translateY: y }],
        },
      ]}
      {...panResponder.panHandlers}
    >
      <HorizontalLine />
      {children}
    </Animated.View>
  );
};

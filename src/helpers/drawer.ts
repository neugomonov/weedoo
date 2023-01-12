import { Animated } from "react-native";
import { DrawerState } from "/constants";

export const animateMove = (
  y: Animated.Value,
  toValue: number | Animated.Value,
  callback?: $TSFixMe
) => {
  Animated.spring(y, {
    toValue: -toValue,
    tension: 20,
    useNativeDriver: true,
  }).start((finished) => {
    /* Optional: But the purpose is to call this after the the animation has finished. Eg. Fire an event that will be listened to by the parent component */
    finished && callback && callback();
  });
};

export const getNextState = (
  currentState: DrawerState,
  val: number,
  margin: number
): DrawerState => {
  switch (currentState) {
    case DrawerState.Peek:
      return val >= currentState + margin
        ? DrawerState.Open
        : val <= DrawerState.Peek - margin
        ? DrawerState.Closed
        : DrawerState.Peek;
    case DrawerState.Open:
      return val >= currentState
        ? DrawerState.Open
        : val <= DrawerState.Peek
        ? DrawerState.Closed
        : DrawerState.Peek;
    case DrawerState.Closed:
      return val >= currentState + margin
        ? val <= DrawerState.Peek + margin
          ? DrawerState.Peek
          : DrawerState.Open
        : DrawerState.Closed;
    default:
      return currentState;
  }
};

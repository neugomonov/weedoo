import { LatLng } from "react-native-maps";

export const moveTo = async (position: LatLng) => {
  const camera = await mapRef.current?.getCamera();
  if (camera) {
    camera.center = position;
    mapRef.current?.animateCamera(camera, { duration: 1000 });
  }
};

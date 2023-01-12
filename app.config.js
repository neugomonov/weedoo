// the dotenv/config will read the .env file
// and merge it with process.env data
// This is just for the builds that happen outside of eas
import "dotenv/config";

// the secrets created with eas secret:create will
// be merged with process.env during eas builds
const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;

export default {
  name: "wedo",
  slug: "wedo",
  version: "1.0.0",
  platforms: ["ios", "android", "web"],
  orientation: "portrait",
  icon: "./src/assets/icons/icon.png",
  splash: {
    image: "./src/assets/icons/splash.png",
    resizeMode: "contain",
    backgroundColor: "#ffffff",
  },
  updates: {
    fallbackToCacheTimeout: 0,
    url: "https://u.expo.dev/d0499834-fcdc-4f8f-8430-9ca9ce87a8dd",
  },
  assetBundlePatterns: ["**/*"],
  ios: {
    supportsTablet: true,
    bundleIdentifier: "com.antivalery.wedo",
  },
  android: {
    adaptiveIcon: {
      foregroundImage: "./src/assets/icons/adaptive-icon.png",
      backgroundColor: "#FFFFFF",
    },
    package: "com.antivalery.wedo",
  },
  web: {
    favicon: "./src/assets/icons/favicon.png",
  },
  extra: {
    GOOGLE_API_KEY: GOOGLE_API_KEY,
    eas: {
      projectId: "d0499834-fcdc-4f8f-8430-9ca9ce87a8dd",
    },
  },
  runtimeVersion: "sdkVersion",
};

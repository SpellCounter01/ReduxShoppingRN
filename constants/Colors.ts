/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = "#0a7ea4";
const tintColorDark = "#fff";

interface Color {
  text: string;
  darkBackground: string;
  background: string;
  tint: string;
  icon: string;
  tabIconDefault: string;
  tabIconSelected: string;
  starColor: string;
}

export const Colors: { [key: string]: Color } = {
  light: {
    text: "#11181C",
    darkBackground: "#2a272a",
    background: "#fff",
    tint: tintColorLight,
    icon: "#687076",
    tabIconDefault: "#687076",
    tabIconSelected: tintColorLight,
    starColor: "#b5a65b",
  },
  dark: {
    text: "#BBB6A5",
    darkBackground: "#2A2F33",
    background: "#8C9491",
    tint: tintColorDark,
    icon: "#9BA1A6",
    tabIconDefault: "#9BA1A6",
    tabIconSelected: tintColorDark,
    starColor: "#a5945d",
  },
};

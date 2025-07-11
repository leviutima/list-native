import { useColorScheme } from "react-native";
import { darkTheme, lightTheme } from "../styles/themes";

export function useDarkMode() {
  const scheme = useColorScheme();
  const isDark = scheme === "dark";

  return {
    theme: isDark ? darkTheme : lightTheme,
    isDark,
  };
}

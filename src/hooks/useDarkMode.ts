import { useColorScheme } from "react-native";
import { darkTheme, lightTheme } from "../styles/themes";

export function useDarkMode() {
  const scheme = useColorScheme();
  const isDark = scheme === "dark";

   const forceDark = true;
  
  return {
    theme: forceDark ? darkTheme : (isDark ? darkTheme : lightTheme),
    isDark: forceDark ? true : isDark,
  };
}

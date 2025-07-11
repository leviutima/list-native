import { StatusBar } from "expo-status-bar";
import { useColorScheme} from "react-native";
import Login from "./src/pages/login";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import Home from "./src/pages/home";
import { UserProvider } from "./src/context/user-context";
import { TaskProvider } from "./src/context/task-context";
import { ThemeProvider } from "styled-components";
import { useDarkMode } from "./src/hooks/useDarkMode";

export default function App() {
  const Stack = createNativeStackNavigator();
  const { theme } = useDarkMode();

  return (
    <ThemeProvider theme={theme}>
      <UserProvider>
        <TaskProvider>
          <NavigationContainer >
            <Stack.Navigator>
              <Stack.Screen
                name="login"
                component={Login}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Home"
                component={Home}
                options={{ headerShown: false }}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </TaskProvider>
      </UserProvider>
    </ThemeProvider>
  );
}

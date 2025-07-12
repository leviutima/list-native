import Login from "./src/pages/login";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import Home from "./src/pages/home";
import { UserProvider } from "./src/context/user-context";
import { TaskProvider } from "./src/context/task-context";
import { ThemeProvider } from "styled-components";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function App() {
  const Stack = createNativeStackNavigator();
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retry: 1,
        refetchOnReconnect: true,
        staleTime: 1000 * 60 * 5,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <TaskProvider>
          <NavigationContainer>
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
    </QueryClientProvider>
  );
}

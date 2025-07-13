import Login from "./src/pages/login";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import Home from "./src/pages/home";
import SignUp from "./src/pages/sign-up";
import { TaskProvider } from "./src/context/task-context";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import { store } from "./src/redux/store";

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
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
          <TaskProvider>
            <NavigationContainer>
              <Stack.Navigator>
                <Stack.Screen
                  name="SignUp"
                  component={SignUp}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="Login"
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
      </QueryClientProvider>
      </Provider>
  );
}

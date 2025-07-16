import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NavigationContainer } from "@react-navigation/native";
import Home from "../../pages/home";

jest.mock("react-redux", () => ({
  useSelector: () => ({
    id: "user-123",
  }),
}));

jest.mock("@react-navigation/native", () => {
  const actualNav = jest.requireActual("@react-navigation/native");
  return {
    ...actualNav,
    useNavigation: () => ({
      navigate: jest.fn(),
    }),
  };
});

jest.mock("../../service/task/get-unique-task", () => ({
  getTasksByUser: jest.fn().mockResolvedValue([
    {
      id: "1",
      title: "Comprar pão",
      description: "Ir à padaria",
      status: "PENDING",
      finished: false,
      subtasks: [],
    },
    {
      id: "2",
      title: "Estudar React",
      description: "Hooks",
      status: "URGENT",
      finished: false,
      subtasks: [],
    },
  ]),
}));

const queryClient = new QueryClient();

const renderHome = () =>
  render(
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <Home />
      </NavigationContainer>
    </QueryClientProvider>
  );

describe("Home", () => {
  it("renderiza as tarefas corretamente", async () => {
    const { getByText } = renderHome();

    await waitFor(() => {
      expect(getByText("Comprar pão")).toBeTruthy();
      expect(getByText("Estudar React")).toBeTruthy();
    });
  });

  it("filtra tarefas pendentes", async () => {
    const { getByText, queryByText } = renderHome();

    await waitFor(() => getByText("Pendente"));
    fireEvent.press(getByText("Pendente"));

    await waitFor(() => {
      expect(getByText("Comprar pão")).toBeTruthy();
      expect(queryByText("Estudar React")).toBeNull();
    });
  });

  it("filtra tarefas urgentes", async () => {
    const { getByText, queryByText } = renderHome();

    await waitFor(() => getByText("Urgente"));
    fireEvent.press(getByText("Urgente"));

    await waitFor(() => {
      expect(getByText("Estudar React")).toBeTruthy();
      expect(queryByText("Comprar pão")).toBeNull();
    });
  });
});

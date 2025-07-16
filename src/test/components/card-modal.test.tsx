// src/test/components/card-modal.test.tsx

import React from "react";
import { fireEvent, render, waitFor } from "@testing-library/react-native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// ✅ Corrigido: mocks encapsulados corretamente dentro da função
jest.mock("@expo/vector-icons", () => {
  const React = require("react");
  const { Text } = require("react-native");
  return {
    Ionicons: ({ name }: any) => <Text>{name}</Text>,
  };
});

jest.mock("../../components/modal/task-modal", () => {
  const React = require("react");
  const { Text } = require("react-native");
  return {
    TaskModal: () => <Text>Mocked Modal</Text>,
  };
});

jest.mock("../../service/task/patch-finished-task", () => ({
  patchFinishedTask: jest.fn(() => Promise.resolve()),
}));

jest.mock("../../service/task/delete-task", () => ({
  deleteTask: jest.fn(() => Promise.resolve()),
}));

import CardTodo from "../../components/card-todo/cardTodo";

const renderWithClient = (ui: React.ReactElement) => {
  const queryClient = new QueryClient();
  return render(
    <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>
  );
};

describe("CardTodo", () => {
  const defaultProps = {
    id: "1",
    title: "Título de teste",
    description: "Descrição de teste",
    status: "PENDING" as const,
    subtasks: [
      { title: "Sub 1", finished: false },
      { title: "Sub 2", finished: true },
    ],
    finished: false,
  };

  it("renderiza corretamente com título e descrição", () => {
    const { getByText } = renderWithClient(<CardTodo {...defaultProps} />);
    expect(getByText("Título de teste")).toBeTruthy();
    expect(getByText("Descrição de teste")).toBeTruthy();
    expect(getByText("PENDING")).toBeTruthy();
  });

  it("abre o modal ao pressionar o card", async () => {
    const { getByText } = renderWithClient(<CardTodo {...defaultProps} />);
    fireEvent.press(getByText("Título de teste"));
    await waitFor(() => {
      expect(getByText("Mocked Modal")).toBeTruthy();
    });
  });

  it("altera o estado de finalizado ao pressionar o botão de check", async () => {
    const { getByText } = renderWithClient(<CardTodo {...defaultProps} />);
    fireEvent.press(getByText("ellipse-outline"));
    await waitFor(() => {
      expect(getByText("checkmark-circle")).toBeTruthy();
    });
  });

  it("chama a função de deletar ao pressionar o ícone de lixeira", async () => {
    const { getByText } = renderWithClient(<CardTodo {...defaultProps} />);
    fireEvent.press(getByText("trash"));
    await waitFor(() => {
      expect(getByText("trash")).toBeTruthy();
    });
  });
});

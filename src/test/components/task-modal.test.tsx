import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TaskModal } from "../../components/modal/task-modal";

jest.mock("@tanstack/react-query", () => {
  const actual = jest.requireActual("@tanstack/react-query");
  return {
    ...actual,
    useMutation: () => ({
      mutate: jest.fn(),
      isPending: false,
    }),
  };
});

const renderWithClient = (ui: React.ReactNode) => {
  const queryClient = new QueryClient();
  return render(
    <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>
  );
};

describe("TaskModal", () => {
  const baseProps = {
    id: "abc123",
    visible: true,
    onClose: jest.fn(),
    title: "Título teste",
    description: "Descrição teste",
    status: "PENDING" as const,
    subtasks: [
      { title: "Sub 1", finished: false },
      { title: "Sub 2", finished: false },
    ],
  };

  it("renderiza corretamente", () => {
    const { getByText, getByPlaceholderText } = renderWithClient(
      <TaskModal {...baseProps} />
    );

    expect(getByText("Título teste")).toBeTruthy();
    expect(getByText("Descrição teste")).toBeTruthy();
    expect(getByText("PENDING")).toBeTruthy();
    expect(getByText("Sub 1")).toBeTruthy();
    expect(getByText("Sub 2")).toBeTruthy();
    expect(getByPlaceholderText("Nova subtarefa")).toBeTruthy();
  });

  it("permite editar o título", async () => {
    const { getByText, getByDisplayValue, queryByText } = renderWithClient(
      <TaskModal {...baseProps} />
    );
    const tituloEl = getByText("Título teste");
    fireEvent.press(tituloEl);
    const input = await waitFor(() => getByDisplayValue("Título teste"));
    fireEvent.changeText(input, "Novo título");
    const atualizarBtn = queryByText("Atualizar");
    expect(atualizarBtn).toBeTruthy();
    fireEvent.press(atualizarBtn!);
  });

  it("permite editar a descrição", async () => {
    const { getByText, getByDisplayValue, queryByText } = renderWithClient(
      <TaskModal {...baseProps} />
    );
    const descricaoEl = getByText("Descrição teste");
    fireEvent.press(descricaoEl);
    const input = await waitFor(() =>
      getByDisplayValue("Descrição teste")
    );
    fireEvent.changeText(input, "Nova descrição");
    const atualizarBtn = queryByText("Atualizar");
    expect(atualizarBtn).toBeTruthy();
    fireEvent.press(atualizarBtn!);
  });
});

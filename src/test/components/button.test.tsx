import ButtonSis from "../../components/button/button";
import { render, fireEvent } from "@testing-library/react-native";

describe("ButtonSis component", () => {
  it("deve renderizar o texto do botão", () => {
    const mockFn = jest.fn();

    const { getByText } = render(
      <ButtonSis onPress={mockFn}>Clique</ButtonSis>
    );

    expect(getByText("Clique")).toBeTruthy();
  });

  it("deve chamar a função onPress quando clicado", () => {
    const mockFn = jest.fn();

    const { getByText } = render(
      <ButtonSis onPress={mockFn}>Clique</ButtonSis>
    );

    const button = getByText("Clique");
    fireEvent.press(button);
    expect(mockFn).toHaveBeenCalled();
  });

  it("não deve chamar onPress quando estiver desabilitado", () => {
    const mockFn = jest.fn();

    const { getByText } = render(
      <ButtonSis onPress={mockFn} disabled={true}>Clique</ButtonSis>
    );

    const button = getByText("Clique");

    fireEvent.press(button);

    expect(mockFn).not.toHaveBeenCalled();
  });
});

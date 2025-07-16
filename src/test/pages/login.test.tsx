import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import { NavigationContainer } from "@react-navigation/native";
import Login from "../../pages/login";

const mockDispatch = jest.fn();
const mockReset = jest.fn();
const mockNavigate = jest.fn(); 

let mockedState: {
  auth: {
    loading: boolean;
    error: string | null;
    user: { id: number; name: string } | null;
  };
};

jest.mock("react-redux", () => ({
  useDispatch: () => mockDispatch,
  useSelector: (selectorFn: any) => selectorFn(mockedState),
}));

jest.mock("@react-navigation/native", () => {
  const actualNav = jest.requireActual("@react-navigation/native");
  return {
    ...actualNav,
    useNavigation: () => ({
      navigate: mockNavigate,
      reset: mockReset,
    }),
  };
});

describe("Login screen", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockedState = {
      auth: {
        loading: false,
        error: null,
        user: null,
      },
    };
  });

  it("deve exibir erro ao enviar sem preencher os campos", async () => {
    const { getByText } = render(
      <NavigationContainer>
        <Login />
      </NavigationContainer>
    );

    fireEvent.press(getByText("Entrar"));

    await waitFor(() => {
      expect(getByText("Insira um email válido")).toBeTruthy();
      expect(getByText("Senha é obrigatória")).toBeTruthy();
    });
  });

  it("deve chamar dispatch com os dados corretos", async () => {
    const { getByPlaceholderText, getByText } = render(
      <NavigationContainer>
        <Login />
      </NavigationContainer>
    );

    fireEvent.changeText(
      getByPlaceholderText("Digite seu email"),
      "test@email.com"
    );
    fireEvent.changeText(getByPlaceholderText("Digite sua senha"), "123456");
    fireEvent.press(getByText("Entrar"));

    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalledWith({
        type: "LOGIN_REQUEST",
        payload: {
          email: "test@email.com",
          password: "123456",
        },
      });
    });
  });

  it("deve navegar para Home ao logar com sucesso", async () => {
    mockedState.auth.user = { id: 1, name: "João" };

    render(
      <NavigationContainer>
        <Login />
      </NavigationContainer>
    );

    await waitFor(() => {
      expect(mockReset).toHaveBeenCalledWith({
        index: 0,
        routes: [{ name: "Home" }],
      });
    });
  });
});

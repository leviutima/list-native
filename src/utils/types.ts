export type RootStackParamList = {
  Login: undefined;
  Home: undefined;
  SignUp: undefined;
  Profile: undefined;
  Splash: undefined;
};

export enum StatusTaskType {
  URGENT = "URGENT",
  PENDING = "PENDING",
  OPTIONAL = "OPTIONAL",
}

export type TaskStatus = "URGENT" | "PENDING" | "OPTIONAL";
import styled from "styled-components/native";

export const ContainerPropsTask = styled.View`

`;

export const ModalStyle = styled.View`
  background-color: white;
  padding: 24px;
  border-radius: 12px;
  width: 90%;
  max-height: 90%;
`;

export const InputContainerChange = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`

export const Background = styled.View`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: center;
  align-items: center;
`;

export const Container = styled.View`
  background-color: white;
  width: 90%;
  max-height: 90%;
  border-radius: 10px;
  padding: 20px;
`;

export const Title = styled.Text`
  font-size: 22px;
  font-weight: bold;
  margin-bottom: 16px;
  text-align: center;
`;

export const Input = styled.TextInput`
  border-width: 1px;
  border-color: #ccc;
  border-radius: 6px;
  padding: 8px 12px;
  margin-bottom: 12px;
`;

export const TextArea = styled(Input)`
  height: 80px;
`;

export const PickerWrapper = styled.View`
  border-width: 1px;
  border-color: #ccc;
  border-radius: 6px;
  margin-bottom: 12px;
`;

export const Row = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const CancelButton = styled.TouchableOpacity`
  background-color: #aaa;
  padding: 10px 20px;
  border-radius: 6px;
`;

export const SubmitButton = styled.TouchableOpacity`
  background-color: #878af6;
  padding: 10px 20px;
  border-radius: 6px;
`;

export const AddButton = styled.TouchableOpacity`
  background-color: #878af6;
  padding: 10px;
  border-radius: 6px;
`;

export const ButtonText = styled.Text`
  color: white;
  font-weight: bold;
`;

export const ErrorText = styled.Text`
  color: red;
  margin-bottom: 8px;
`;

export const SubtaskLabel = styled.Text`
  font-weight: bold;
  margin-bottom: 6px;
`;

export const SubtaskItem = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding: 6px 10px;
  background-color: #f2f2f2;
  border-radius: 6px;
  margin-bottom: 8px;
`;

export const SubtaskTitle = styled.Text``;

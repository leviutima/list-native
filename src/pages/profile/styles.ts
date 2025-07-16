import styled from "styled-components/native";

export const Wrapper = styled.View`
  flex: 1;
`;

export const Centered = styled.View`
  display: flex;
  align-items: center;
`;


export const FieldContainer = styled.View`
  margin-bottom: 16px;
`;

export const Label = styled.Text`
  font-weight: bold;
  font-size: 46px;
  color: white;
`;

export const TextRow = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const FieldText = styled.Text`
  flex: 1;
  font-size: 26px;
  color: white;
`;

export const FieldInput = styled.TextInput`
  flex: 1;
  font-size: 26px;
  color: white;
  border-bottom-width: 1px;
  border-color: white;
`;

export const EditIcon = styled.TouchableOpacity`
  margin-left: 8px;
`;

export const SaveButton = styled.TouchableOpacity`
  background-color: #878af6;
  border-radius: 6px;
  margin-top: 20px;
`;

export const SaveButtonText = styled.Text`
  text-align: center;
  color: white;
  font-weight: bold;
`;

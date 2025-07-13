import styled from "styled-components/native";

export const CardContainer = styled.View`
  background-color: #ffffff;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;
`;

export const HeaderCard = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const TitleWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 8px;
`;

export const CheckButton = styled.TouchableOpacity`
  padding: 4px;
`;

export const Title = styled.Text`
  font-size: 16px;
  font-weight: bold;
`;

export const Description = styled.Text`
  font-size: 14px;
  color: #666;
  margin-top: 8px;
  margin-bottom: 12px;
`;

export const FlagsContainer = styled.View`
  flex-direction: row;
  gap: 8px;
`;

export const Flag = styled.Text`
  padding: 4px 8px;
  color: white;
  border-radius: 12px;
  font-size: 12px;
  overflow: hidden;
`;

export const Checkmark = styled.View`
  margin-left: 8px;
`;

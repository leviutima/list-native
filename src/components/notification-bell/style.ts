import styled from "styled-components/native";

export const BellButton = styled.TouchableOpacity`
  position: relative;
`;

export const NotificationBadge = styled.View`
  position: absolute;
  top: -6px;
  right: -6px;
  background-color: #f44336;
  border-color: #fff;
  border-width: 2px;
  border-radius: 12px;
  height: 20px;
  min-width: 20px;
  padding: 0 4px;
  align-items: center;
  justify-content: center;
  z-index: 10;
`;

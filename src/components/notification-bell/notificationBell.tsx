import React from "react";
import { Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { BellButton, NotificationBadge } from "./style";


type NotificationBellProps = {
  urgentCount: number;
  onPress: () => void;
};

export function NotificationBell({ urgentCount, onPress }: NotificationBellProps) {
  return (
    <BellButton onPress={onPress}>
      <Ionicons name="notifications-outline" size={28} color="#333" />

      {urgentCount > 0 && (
        <NotificationBadge>
          <Text
            style={{
              color: "white",
              fontSize: 12,
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            {urgentCount > 9 ? "9+" : urgentCount}
          </Text>
        </NotificationBadge>
      )}
    </BellButton>
  );
}

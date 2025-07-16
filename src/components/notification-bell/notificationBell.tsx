import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type NotificationBellProps = {
  urgentCount: number;
  onPress: () => void;
};

export function NotificationBell({ urgentCount, onPress }: NotificationBellProps) {
  return (
    <TouchableOpacity onPress={onPress} style={{ position: "relative" }}>
      <Ionicons name="notifications-outline" size={28} color="#333" />
      {urgentCount > 0 && (
        <View
          style={{
            position: "absolute",
            top: -4,
            right: -4,
            backgroundColor: "#f44336",
            borderRadius: 10,
            paddingHorizontal: 6,
            paddingVertical: 2,
            minWidth: 20,
            alignItems: "center",
          }}
        >
          <Text style={{ color: "white", fontSize: 12 }}>
            {urgentCount}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

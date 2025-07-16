import React, { useEffect, useRef } from "react";
import { Animated, Text, View, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface ToastProps {
  visible: boolean;
  type?: "success" | "error" | "info";
  message: string;
  onHide: () => void;
  duration?: number; 
}

export const Toast: React.FC<ToastProps> = ({
  visible,
  type = "info",
  message,
  onHide,
  duration = 3000,
}) => {
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start(() => {
        setTimeout(() => {
          Animated.parallel([
            Animated.timing(opacity, {
              toValue: 0,
              duration: 300,
              useNativeDriver: true,
            }),
            Animated.timing(translateY, {
              toValue: 30,
              duration: 300,
              useNativeDriver: true,
            }),
          ]).start(onHide);
        }, duration);
      });
    }
  }, [visible]);

  if (!visible) return null;

  const backgroundColor = {
    success: "#4BB543",
    error: "#E74C3C",
    info: "#3498DB",
  }[type];

  const iconName = {
    success: "checkmark-circle-outline",
    error: "close-circle-outline",
    info: "information-circle-outline",
  }[type];

  return (
    <Animated.View
      style={[
        styles.toastContainer,
        {
          backgroundColor,
          opacity,
          transform: [{ translateY }],
        },
      ]}
    >
      <Ionicons name={iconName as any} size={20} color="#fff" style={{ marginRight: 8 }} />
      <Text style={styles.message}>{message}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  toastContainer: {
    flexDirection: "row",
    alignItems: "center",
    position: "absolute",
    bottom: 50,
    alignSelf: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 10,
    zIndex: 1000,
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
  },
  message: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
  },
});

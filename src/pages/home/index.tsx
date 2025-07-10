import React from "react";
import { View, Text } from "react-native";
import { Header } from "../../components/header/header";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Home() {
  return (
    <SafeAreaView >
      <View>
        <Header />
        <Text>olá mundo</Text>
      </View>
    </SafeAreaView>
  );
}

import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AVPlaybackStatus, ResizeMode, Video } from "expo-av";
import { StyleSheet } from "react-native";
import { RootStackParamList } from "../../utils/types";

export default function Splash() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const onPlaybackStatusUpdate = (status: AVPlaybackStatus) => {
    if (status.isLoaded && status.didJustFinish) {
      navigation.reset({
        index: 0,
        routes: [{ name: "Home" }],
      });
    }
  };

  return (
    <Video
      style={StyleSheet.absoluteFill}
      resizeMode={ResizeMode.CONTAIN}
      source={require("../../../assets/splash.mp4")}
      isLooping={false}
      onPlaybackStatusUpdate={onPlaybackStatusUpdate}
      shouldPlay={true}
    />
  );
}

import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AVPlaybackStatus, ResizeMode, Video } from "expo-av";
import { StyleSheet } from "react-native";
import { RootStackParamList } from "../../utils/types";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

export default function Splash() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

     const user = useSelector((state: RootState) => state.auth.user);

  const onPlaybackStatusUpdate = (status: AVPlaybackStatus) => {
    if (status.isLoaded && status.didJustFinish) {
      navigation.reset({
        index: 0,
        routes: [{ name: user ? "Home" : "SignUp" }], 
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

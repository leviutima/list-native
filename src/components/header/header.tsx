import { Text, View } from "react-native";
import { style } from "./style";
import Input from "../input/input";
import { useUser } from "../../context/user-context";

export function Header() {
    const {email} = useUser()

    return(
        <View style={style.mainContainer}>
            <Text style={{color: 'white', fontSize: 25, fontWeight: '600'}}>Olá {email}</Text>
            <Input value="" onChangeText={() => {}} placeholder="Crie uma tarefa"/>
        </View>
    )
}
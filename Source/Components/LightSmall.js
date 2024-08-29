import useColorStyle from "../Styles/ColorStyle";
import FontStyles from "../Styles/FontStyle";
import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";

export default Lightsmall = ({ lightStatus }) => {
    const colorStyle = useColorStyle();
    const fontstyles = FontStyles();
    return (
        <View className=' flex-row gap-2'>
            <View style={{ backgroundColor: lightStatus ? colorStyle.diffYellow : colorStyle.iconBg }} className=' p-2 rounded-full'>
                <Ionicons name={'bulb'} size={20} color={colorStyle.mainText} />
            </View>
            <View>
                <Text style={[fontstyles.home, { marginTop: -3, color: colorStyle.mainText }]}>Light</Text>
                <Text style={[fontstyles.homesmall, { marginTop: 4, color: colorStyle.subText }]}>{lightStatus ? 'On' : 'Off'}</Text>
            </View>
        </View>
    )
}
import * as React from 'react';
import { Button, ScrollView, StatusBar, Text, View } from 'react-native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
// import CostomDrawerNavigator from './CostomDrawerNavigator';
import useColorStyle from '../Styles/ColorStyle';
import { TouchableOpacity } from 'react-native-gesture-handler';
import HomeScreen from '../Screen/HomeScreen';

const Drawer = createDrawerNavigator();
const HomeScreen_Icon = ({ focused, color, size }) => <Ionicons name='home' size={size} color={color} />
const Notifications_Icon = ({ focused, color, size }) => <Ionicons name='tv' size={size} color={color} />
const Notifications2_Icon = ({ focused, color, size }) => <Ionicons name='grid' size={size} color={color} />

function CostomDrawerNavigator(props) {
    const colorStyle = useColorStyle();
    return (
        <View style={{ flex: 1 }}>
            <StatusBar hidden />
            <DrawerContentScrollView {...props}>
                <DrawerItemList {...props} />
            </DrawerContentScrollView>
            <View className=' rounded-xl' style={{alignItems: 'center'}}>
                <TouchableOpacity style={{ borderRadius: 4, marginBottom: 10, alignItems: 'center', justifyContent: 'center', width: 40, height: 45, alignContent: 'center'}}>
                    <Ionicons name='wallet' size={25} color={colorStyle.textMain} />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default function DrawerNavigator() {
  const colorStyle = useColorStyle();
  return (
    <NavigationContainer>
      {/* drawerActiveBackgroundColor: null, drawerActiveTintColor: colorStyle.diffBlue, drawerInactiveTintColor: colorStyle.textMain, drawerStyle: { width: 60, marginTop: -20, backgroundColor: colorStyle.mainbg, justifyContent: 'space-evenly' },  */}
      <Drawer.Navigator drawerContent={props => <CostomDrawerNavigator {...props}/>} screenOptions={{ drawerActiveBackgroundColor: null, drawerType: 'permanent', drawerActiveTintColor: colorStyle.diffBlue, drawerInactiveTintColor: colorStyle.textMain, headerShown: false, drawerStyle: { width: 60, backgroundColor: colorStyle.mainbg} }} initialRouteName="Home">
        <>
        {/* options={{ drawerItemStyle: { width: 40 }, drawerLabel: "", drawerIcon: ProfitIcon2 }} */}
          <Drawer.Screen name="HomeScreen" component={HomeScreen} options={{ drawerItemStyle: { width: 40 }, drawerLabel: "", drawerIcon: HomeScreen_Icon }} />
          <Drawer.Screen name="Notifications" component={HomeScreen} options={{ drawerItemStyle: { width: 40 }, drawerLabel: "", drawerIcon: Notifications_Icon }}/>
          <Drawer.Screen name="Notifications2" component={HomeScreen} options={{ drawerItemStyle: { width: 40 }, drawerLabel: "", drawerIcon: Notifications2_Icon }}/>
        </>
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
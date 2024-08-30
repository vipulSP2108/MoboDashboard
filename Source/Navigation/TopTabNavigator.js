
import { MusicFolders } from '../Tabs/MusicFolders';
import GridScreen  from '../Screen/GridScreen';
import HomeScreen  from '../Screen/GridScreen';
import InActiveScreen  from '../Screen/GridScreen';

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import useColorStyle from '../Styles/ColorStyle';
import FontStyles from '../Styles/FontStyle';
import { MusicTracks } from '../Tabs/MusicTracks';
import { MusicAlbums } from '../Tabs/MusicAlbums';
import { MusicArtists } from '../Tabs/MusicArtists';
import { MusicHome } from '../Tabs/MusicHome';

function ScrollableTabBar({ state, descriptors, navigation }) {
    const colorStyle = useColorStyle();
    const fontstyles = FontStyles();
    return (
      <ScrollView horizontal showsHorizontalScrollIndicator={false} className=' absolute h-14' style={{backgroundColor: colorStyle.subText}}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label = options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;
  
          const isFocused = state.index === index;
  
          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });
  
            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };
  
          return (
            <View key={route.key} className=' p-3'>
              <Text
                onPress={onPress}
                style={[ isFocused ? fontstyles.homebold : fontstyles.homesmall, { bottom: !isFocused && -2, color: isFocused ? colorStyle.mainText : colorStyle.mainBg,
                 }]}
              >
                {label}
              </Text>
            </View>
          );
        })}
      </ScrollView>
    );
  }
  

export default function TopTabNavigator() {
    
    const Tab = createBottomTabNavigator();
    return (
        <Tab.Navigator screenOptions={{headerShown: false}} tabBar={(props) => <ScrollableTabBar {...props} />}>
            <Tab.Screen name="Home"  component={MusicHome}>
                {/* {() => <Tab.Screen name='MusicPlaylists' component={MusicPlaylists} />} */}
            </Tab.Screen>
            <Tab.Screen name="Folders"  component={MusicFolders}>
                {/* {() => <Tab.Screen name='MusicFolders' component={MusicFolders} />} */}
            </Tab.Screen>
            <Tab.Screen name="Albums"  component={MusicAlbums}>
                {/* {() => <Tab.Screen name='MusicFolders' component={MusicFolders} />} */}
            </Tab.Screen>
            <Tab.Screen name="Artists"  component={MusicArtists}>
                {/* {() => <Tab.Screen name='MusicPlaylists' component={MusicPlaylists} />} */}
            </Tab.Screen>
            {/* <Tab.Screen name="Artists"  component={HomeScreen}>
            </Tab.Screen> */}
            <Tab.Screen name="Tracks"  component={MusicTracks}>
                {/* {() => <Tab.Screen name='MusicFolders' component={MusicFolders} />} */}
            </Tab.Screen>
        </Tab.Navigator >
    )
}
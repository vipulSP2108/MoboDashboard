import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import useStyles from './Source/Styles/Styles';

export default function App() {
  const styles = useStyles();

  return (
    // <View style={styles.container}>
    <ScrollView horizontal className='bg-black'>
      <StatusBar hidden />
      <View className="w-[1%] flex-1 items-center">
        <Ionicons name="home" size={24} color={styles.diffBlue} />
        <Ionicons name="albums" size={24} color='red' />
        <Ionicons name="albums-outline" size={24} color='red' />
      </View>
      <View className="flex-1 items-center justify-center bg-black">
        <Text className=' text-white'>Open up App.js to start working on your app!</Text>
      </View>
      <View className="flex-1 items-center justify-center bg-black">
        <Text className=' text-white'>Open up App.js to start working on your app!</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

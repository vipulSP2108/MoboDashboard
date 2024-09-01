// // expo install expo-location
// // expo install expo-sensors

// import { Accelerometer, Gyroscope } from 'expo-sensors';
// import React, { useState, useEffect } from 'react';
// import { View, Text, StyleSheet } from 'react-native';
// import * as Location from 'expo-location';

// const ToolsScreen = () => {
//   let updateCounter = 0;

//   const [speed, setSpeed] = useState(0);
//   const [accelerometerData, setAccelerometerData] = useState({});
//   const [gyroscopeData, setGyroscopeData] = useState({});
//   const [message, setMessage] = useState('');

//   // Define thresholds for bump and pothole detection
//   const ACCELEROMETER_THRESHOLD = 1.5; // Example threshold value
//   const GYROSCOPE_THRESHOLD = 5000; // Example threshold value

//   useEffect(() => {
//     // Function to detect bumps and potholes
//     const detectBumpsAndPotholes = (accelerometerData, gyroscopeData) => {
//       const accMagnitude = Math.sqrt(
//         Math.pow(accelerometerData.x, 2) +
//         Math.pow(accelerometerData.y, 2) +
//         Math.pow(accelerometerData.z, 2)
//       );

//       const gyroMagnitude = Math.sqrt(
//         Math.pow(gyroscopeData.x, 2) +
//         Math.pow(gyroscopeData.y, 2) +
//         Math.pow(gyroscopeData.z, 2)
//       );

//       if (accMagnitude > ACCELEROMETER_THRESHOLD) {
//         setMessage('Bump detected! ACCELEROMETER_THRESHOLD');
//       }
//       if (gyroMagnitude > GYROSCOPE_THRESHOLD) {
//         setMessage('Bump detected! GYROSCOPE_THRESHOLD');
//       } else {
//         setMessage('');
//       }
//     };

//     // Add listeners
//     const accelerometerSubscription = Accelerometer.addListener(data => {
//       setAccelerometerData(data);
//       detectBumpsAndPotholes(data, gyroscopeData);
//     });

//     const gyroscopeSubscription = Gyroscope.addListener(data => {
//       setGyroscopeData(data);
//       detectBumpsAndPotholes(accelerometerData, data);
//     });

//     // Cleanup listeners on component unmount
//     return () => {
//       accelerometerSubscription.remove();
//       gyroscopeSubscription.remove();
//     };
//   }, [accelerometerData, gyroscopeData]);

//   useEffect(() => {
//     let watchId;

//     const startTracking = async () => {
//       // Request location permissions
//       const { status } = await Location.requestForegroundPermissionsAsync();
//       if (status !== 'granted') {
//         console.log('Permission to access location was denied');
//         return;
//       }

//       // Watch for location changes
//       watchId = await Location.watchPositionAsync(
//         {
//           accuracy: Location.Accuracy.High,
//           timeInterval: 1000, // Update every 1 second
//           distanceInterval: 1, // Update every 1 meter
//         },
//         (location) => {
//           // Convert speed from m/s to km/s
//           const speedInKmS = (location.coords.speed || 0) * 0.001;
//           setSpeed(speedInKmS);

//           // Increment and log the update count
//           updateCounter += 1;
//           console.log(`Location update count: ${updateCounter}`);
//         }
//       );
//     };

//     startTracking();

//     // Cleanup function to remove location watcher
//     return () => {
//       if (watchId) {
//         watchId.remove();
//       }
//     };
//   }, []);

//   return (

//     <View style={styles.container}>
//       <Text style={styles.title}>Accelerometer Data</Text>
//       <Text>x: {accelerometerData.x?.toFixed(2)}</Text>
//       <Text>y: {accelerometerData.y?.toFixed(2)}</Text>
//       <Text>z: {accelerometerData.z?.toFixed(2)}</Text>

//       <Text style={styles.title}>Gyroscope Data</Text>
//       <Text>x: {gyroscopeData.x?.toFixed(2)}</Text>
//       <Text>y: {gyroscopeData.y?.toFixed(2)}</Text>
//       <Text>z: {gyroscopeData.z?.toFixed(2)}</Text>

//       <Text style={styles.message}>{message}</Text>
//       <Text style={styles.speedText}>Current Speed:</Text>
//       <Text style={styles.speedValue}>{speed.toFixed(4)} km/s</Text>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#fff',
//   },
//   speedText: {
//     fontSize: 20,
//     fontWeight: 'bold',
//   },
//   speedValue: {
//     fontSize: 40,
//     fontWeight: 'bold',
//     color: 'blue',
//   },
//   title: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginVertical: 10,
//   },
//   message: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: 'red',
//     marginTop: 20,
//   },
// });

// export default ToolsScreen;

// <View style={{ backgroundColor: colorStyle.mainBg, flex: 1 }}>
//   <View style={{ margin: 12, }}>
//     <View className=' rounded-full items-center justify-center' style={{ width: oneCell * 4, height: oneCell * 4, backgroundColor: colorStyle.subBg }} >
//       <View className=' rounded-full items-center justify-center' style={{ width: oneCell * 3, height: oneCell * 3, backgroundColor: colorStyle.mainBg }} >
//         <View className=' rounded-full' style={{
//           shadowColor: 'white',
//           shadowOpacity: 0.26,
//           shadowOffset: { width: -1, height: -3 },
//           shadowRadius: 10,
//           elevation: 20,
//           backgroundColor: 'white',
//           width: oneCell * 2, height: oneCell * 2, backgroundColor: colorStyle.mainBg
//         }} >
//         </View>
//       </View>
//     </View>
//   </View>
// </View>
// <View style={{ backgroundColor: colorStyle.mainBg, flex: 1 }}>
//   <View className=' flex-row items-center justify-end p-3 gap-3'>
//     <TouchableOpacity className=' overflow-hidden items-center justify-center' style={{ borderRadius: 12, backgroundColor: colorStyle.subText, height: (1 * oneCell) * 0.7, width: (1 * oneCell) * 0.7 }} >
//       <Ionicons name={'medical'} size={29} color={colorStyle.mainText} />
//     </TouchableOpacity>
//     <TouchableOpacity className=' overflow-hidden items-center justify-center' style={{ borderRadius: 12, backgroundColor: colorStyle.subText, height: (1 * oneCell) * 0.7, width: (1 * oneCell) * 0.7 }} >
//       <Ionicons name={'medical'} size={29} color={colorStyle.mainText} />
//     </TouchableOpacity>
// <TouchableOpacity className=' overflow-hidden items-center justify-center' style={{ borderRadius: 12, backgroundColor: colorStyle.subText, height: (1 * oneCell) * 0.7, width: (1 * oneCell) * 0.7 }} >
//   <Ionicons name={'medical'} size={29} color={colorStyle.mainText} />
// </TouchableOpacity>
// <Text style={[fontstyles.homebig, { marginBottom: -1, color: colorStyle.mainText }]}>{withOBDhub ? 'With OBDHub' : 'With Location'}</Text>
// <TouchableOpacity onPress={() => setWithOBDhub(!withOBDhub)} className='bg'>
//   <Ionicons name='toggle' size={38} style={{ transform: [{ rotate: withOBDhub ? '0deg' : '180deg' }] }} color={withOBDhub ? colorStyle.diffBlue : colorStyle.mainText} />
// </TouchableOpacity>
//   </View>
//   <View className=' absolute -left-8 top-14 items-center flex-row'>
//     <View className=' -right-11'>
//       <View
//         style={{
//           // transform: [{ rotate:'180deg' }],
//           borderLeftWidth: 125, borderRightWidth: 50,
//           borderBottomWidth: 20,
//           borderBottomColor: colorStyle.subBg
//         }} />
//       <View style={{ backgroundColor: colorStyle.subBg, height: 190}}></View>
//       <View
//         style={{
//           transform: [{ rotate: '180deg' }],
//           borderLeftWidth: 50, borderRightWidth: 125,
//           borderBottomWidth: 20,
//           borderBottomColor: colorStyle.subBg
//         }} />
//     </View>

//     <View style={{backgroundColor: colorStyle.subBg}} className='z-50 overflow-hidden rounded-full'>
//       <View className=' absolute'>
//         <CircularProgress opacity={0.3} color1persentage={180} color2persentage={240} />
//       </View>
//       <CircularProgress opacity={1} color1persentage={160} color2persentage={0} />
//     </View>

//     <View className=' -left-11'>
//       <View style={{
//         borderLeftWidth: 60, borderRightWidth: 250,
//         borderBottomWidth: 20,
//         borderBottomColor: colorStyle.subBg
//       }} />
//       <View style={{backgroundColor: colorStyle.subBg, height: 190}}></View>
//       <View style={{
//         transform: [{ rotate: '180deg' }],
//         borderLeftWidth: 250, borderRightWidth: 60,
//         borderBottomWidth: 20,
//         borderBottomColor: colorStyle.subBg
//       }} />
//     </View>


//   </View>


// </View>
import React from 'react';
import { ScrollView, Text, View, StyleSheet } from 'react-native';
import useColorStyle from '../Styles/ColorStyle';
import FontStyles from '../Styles/FontStyle';

const LicenseScreen = () => {
  const colorStyle = useColorStyle();
  const fontstyles = FontStyles();
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Licenses and References</Text>

      {/* Gratitude Statement */}
      <View style={styles.section}>
        <Text style={styles.subHeader}>Acknowledgments</Text>
        <Text style={styles.text}>
          I am incredibly thankful to the teams behind Expo and React. Their dedication and hard work in creating powerful and user-friendly development tools have made it possible to bring this application to life. Their open-source contributions not only simplify complex development processes but also empower developers around the world to create amazing apps with ease. Thank you for your invaluable efforts!
        </Text>
      </View>

      {/* MIT License Description */}
      <View style={styles.section}>
        <Text style={styles.subHeader}>MIT License</Text>
        <Text style={styles.text}>
          The MIT License is a permissive free software license. This essentially means you can do almost anything with the code, such as using it in proprietary software, as long as you include the original copyright and license notice in any copy of the software. It is simple and easy to understand, and it places very few restrictions on reuse, making it an excellent choice for open-source projects.
        </Text>
      </View>

      {/* Library Licenses */}
      <View style={styles.section}>
        <Text style={styles.subHeader}>Libraries Used</Text>
        <Text style={styles.text}>
          This application uses the following libraries:
        </Text>
        <Text style={styles.text}>
          - @expo/vector-icons: MIT License{'\n'}
          - @react-native-community/slider: MIT License{'\n'}
          - @react-navigation/bottom-tabs: MIT License{'\n'}
          - @react-navigation/drawer: MIT License{'\n'}
          - @react-navigation/native: MIT License{'\n'}
          - @react-navigation/native-stack: MIT License{'\n'}
          - @react-navigation/stack: MIT License{'\n'}
          - @reduxjs/toolkit: MIT License{'\n'}
          - expo: MIT License{'\n'}
          - expo-av: MIT License{'\n'}
          - expo-battery: MIT License{'\n'}
          - expo-linear-gradient: MIT License{'\n'}
          - expo-location: MIT License{'\n'}
          - expo-media-library: MIT License{'\n'}
          - expo-sensors: MIT License{'\n'}
          - expo-status-bar: MIT License{'\n'}
          - nativewind: MIT License{'\n'}
          - react: MIT License{'\n'}
          - react-native: MIT License{'\n'}
          - react-native-gesture-handler: MIT License{'\n'}
          - react-native-reanimated: MIT License{'\n'}
          - react-native-safe-area-context: MIT License{'\n'}
          - react-native-screens: MIT License{'\n'}
          - react-native-svg: MIT License{'\n'}
          - react-redux: MIT License{'\n'}
          - expo-file-system: MIT License{'\n'}
        </Text>
      </View>

      {/* Acknowledgment to Image Contributors */}
      <View style={styles.section}>
        <Text style={styles.subHeader}>Image Credits</Text>
        <Text style={styles.text}>
          We extend our heartfelt thanks to the talented creators of the images used in this application:
        </Text>
        <Text style={styles.text}>
          {/* - Image by <a href="https://pixabay.com/users/piro4d-2707530/?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=4242489">PIRO</a> from <a href="https://pixabay.com//?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=4242489">Pixabay</a>. */}
        </Text>
        <Text style={styles.text}>
          {/* - Image by <a href="https://pixabay.com/users/charlvera-11040068/?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=4609408">Chil Vera</a> from <a href="https://pixabay.com//?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=4609408">Pixabay</a>. */}
        </Text>
        <Text style={styles.text}>
          Your creative work enriches our app, and we are deeply grateful for your contributions!
        </Text>
      </View>

      {/* Font Credits */}
<View style={styles.section}>
  <Text style={styles.subHeader}>Font Credits</Text>
  <Text style={styles.text}>
    This application uses the following custom fonts:
  </Text>
  <Text style={styles.text}>
    - **Zain Font Family**: Zain-Black, Zain-ExtraBold, Zain-Bold, Zain-Light, Zain-ExtraLight, Zain-Regular.
  </Text>
  <Text style={styles.text}>
    - **Montserrat Font Family**: Montserrat-Black, Montserrat-ExtraBold, Montserrat-Bold, Montserrat-Light, Montserrat-ExtraLight, Montserrat-Medium. Montserrat is a Google Font available under the Open Font License.
  </Text>
  <Text style={styles.text}>
    Special thanks to the designers of these fonts for their contributions, which help make our app's text more readable and visually appealing!
  </Text>
</View>

      {/* Special Thanks */}
      <View style={styles.section}>
        <Text style={styles.subHeader}>Special Thanks</Text>
        <Text style={styles.text}>
          We would like to express our gratitude to the following:
        </Text>
        <Text style={styles.text}>
          - **PIRO** and **Chil Vera** from Pixabay for providing beautiful images that enhance the visual appeal of our app.
        </Text>
        <Text style={styles.text}>
          - The creators of **Ionicons** and **MaterialCommunityIcons** included in `@expo/vector-icons` for providing a rich set of icons that help make our application more intuitive and user-friendly.
        </Text>
        <Text style={styles.text}>
          We are incredibly thankful for your contributions, which have been essential in making this app better!
        </Text>
      </View>


      {/* Additional References */}
      <View style={styles.section}>
        <Text style={styles.subHeader}>Additional References</Text>
        <Text style={styles.text}>
          - Icons provided by @expo/vector-icons are based on Material Icons,
          licensed under the Apache License 2.0.
        </Text>
        <Text style={styles.text}>
          - Fonts used in this application are part of the Google Fonts library.
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#000',
  },
  header: {
color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  section: {
    marginBottom: 20,
  },
  subHeader: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  text: {
    color: 'white',
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 10,
  },
});

export default LicenseScreen;








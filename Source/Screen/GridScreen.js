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

import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useContext, useState } from 'react'
import FontStyles from '../Styles/FontStyle';
import useColorStyle from '../Styles/ColorStyle';
import { GlobalStateContext } from '../Context/GlobalStateProvider';
import Speedo from '../Components/Speedo';
import { Ionicons } from '@expo/vector-icons';

export default function GridScreen() {
  const { oneGap, oneCell } = useContext(GlobalStateContext);
  const colorStyle = useColorStyle();
  const fontstyles = FontStyles();

  const [vegMode, setVegMode] = useState();
  const [withOBDhub, setWithOBDhub] = useState(false);
  const maxSpeed = 270;
  const currentSpeed =210;
  
  return (
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
    //     <TouchableOpacity className=' overflow-hidden items-center justify-center' style={{ borderRadius: 12, backgroundColor: colorStyle.subText, height: (1 * oneCell) * 0.7, width: (1 * oneCell) * 0.7 }} >
    //       <Ionicons name={'medical'} size={29} color={colorStyle.mainText} />
    //     </TouchableOpacity>
    //     <Text style={[fontstyles.homebig, { marginBottom: -1, color: colorStyle.mainText }]}>{withOBDhub ? 'With OBDHub' : 'With Location'}</Text>
    //     <TouchableOpacity onPress={() => setWithOBDhub(!withOBDhub)} className='bg'>
    //       <Ionicons name='toggle' size={38} style={{ transform: [{ rotate: withOBDhub ? '0deg' : '180deg' }] }} color={withOBDhub ? colorStyle.diffBlue : colorStyle.mainText} />
    //     </TouchableOpacity>
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

    <View style={{ backgroundColor: '#101010', flex: 1, justifyContent: 'center' }}>
      <View className=' flex-row items-center m-3 justify-between'>
        <View className=' absolute z-50 overflow-hidden rounded-full items-center justify-center border-2 border-cyan-200 p-1'>
        <View
        style={{
          position: 'absolute',
          zIndex: 10,
          // transform: [{ rotate: '180deg' }],
          width: 25,
          // height: ,
          borderLeftWidth: 9, borderRightWidth: 10,
          borderBottomWidth: 110,
          borderLeftColor: 'transparent',
          borderRightColor: 'transparent',
          borderBottomColor: 'yellow',
          shadowColor: 'yellow',
          elevation: 20,
          transform: [
            { translateX: 1 }, // Center the indicator horizontally
            { rotate: `${-130 + currentSpeed}deg` }, // Rotation to align with progress
            { translateY: -57 } // Move the indicator to start from the center
          ],
        }} />
          <Speedo opacity={0.3} color1persentage={180} color2persentage={264} colorsmall1persentage={40} colorsmall2persentage={60} onlyBG={true}/>
          <View className='border-2 border-cyan-200 p-2 z-20 absolute rounded-full items-center justify-center' style={{
            shadowColor: colorStyle.mainText,
            shadowOpacity: 0.26,
            shadowOffset: { width: -1, height: -3 },
            shadowRadius: 10,
            elevation: 30,
            backgroundColor: 'white',
            width: oneCell * 1.8, height: oneCell * 1.8, backgroundColor: colorStyle.mainBg
          }}>
            <Text style={[fontstyles.numlight, { fontSize: 50, marginBottom: -1, color: colorStyle.mainText }]}>{currentSpeed}</Text>
            <Text style={[fontstyles.home, { marginBottom: 1, color: colorStyle.mainText }]}>KM/H</Text>
          </View>

          <View style={{ backgroundColor: colorStyle.mainBg }} className='absolute flex-row bottom-16 h-10 w-16 z-50' />
          <View className=' absolute'>
            <Speedo opacity={1} color1persentage={currentSpeed} color2persentage={currentSpeed} colorsmall1persentage={35} colorsmall2persentage={35} maxSpeed={maxSpeed}/>
          </View>
        </View>
        
        
      </View>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
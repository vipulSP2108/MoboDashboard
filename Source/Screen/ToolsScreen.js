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

import {
  findNodeHandle,
  View, Text, StyleSheet, TouchableOpacity, FlatList, Animated, ScrollView,
  Dimensions
} from 'react-native'
import React, { useContext, useEffect, useRef, useState } from 'react'
import FontStyles from '../Styles/FontStyle';
import useColorStyle from '../Styles/ColorStyle';
import { GlobalStateContext } from '../Context/GlobalStateProvider';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Speedo from '../Components/Speedo';

const data = [
  { key: 'Item 1', label: 'decagram', ref: React.createRef() },
  { key: 'Item 2', label: 'car-battery', ref: React.createRef() },
  { key: 'Item 3', label: 'car-brake-alert', ref: React.createRef() },
  // car-brake-low-pressure car-brake-parking car-brake-retarder car-brake-temperature
  { key: 'Item 4', label: 'car-brake-abs', ref: React.createRef() },
  { key: 'Item 5', label: 'car-light-high', ref: React.createRef() }, //car-light-dimmed car-parking-lights car-light-alert
  { key: 'Item 6', label: 'shield-car', ref: React.createRef() },
  { key: 'Item 7', label: 'car-shift-pattern', ref: React.createRef() },
  { key: 'Item 8', label: 'car-speed-limiter', ref: React.createRef() },
  { key: 'Item 9', label: 'fuel', ref: React.createRef() },
  { key: 'Item 10', label: 'decagram', ref: React.createRef() },
];

export default function ToolsScreen() {
  const { oneGap, oneCell } = useContext(GlobalStateContext);
  const colorStyle = useColorStyle();
  const fontstyles = FontStyles();
  const widths = 230;
  const [vegMode, setVegMode] = useState();
  const [withOBDhub, setWithOBDhub] = useState(false);
  const scrollX = useRef(new Animated.Value(0)).current;

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [indicator, setIndicator] = useState('off');


  const ref = React.useRef();
  onItemPress = React.useCallback(itemIndex => {
    setSelectedIndex(itemIndex);
    ref?.current?.scrollToOffset({
      offset: itemIndex * widths,
    })
  })

  const maxSpeed = 270;
  const currentSpeed = 210;

  const maxRPM = 8;
  const currentRPM = 3;

  const converted = (value, max) => {
    // (264 / maxSpeed) * 260;
    return (264 / max) * value;
  }

  const Tabs = ({ scrollX, data, onItemPress, selectedIndex, setSelectedIndex }) => {
    return (
      <View>
        <View className=' flex-row'>
          {data.map((item, index) => {
            return (
              <TouchableOpacity onPress={() => onItemPress(index)}>
                {/* {console.log(selectedIndex)} */}
                <View className=' px-2' ref={item.ref}>
                  <MaterialCommunityIcons color={selectedIndex == index ? 'white' : 'gray'} name={item.label} size={24} />
                </View>
                {/* {console.log((scrollX), Math.floor(widths * index))} */}
              </TouchableOpacity>
            )
          })}
        </View>

      </View>
    );
  };

  return (
    <View style={{ padding: 5, backgroundColor: colorStyle.mainBg, flex: 1, justifyContent: 'center' }}>
      {/* <View className=' flex-row items-center justify-end p-3 gap-3'>
        <TouchableOpacity className=' overflow-hidden items-center justify-center' style={{ borderRadius: 12, backgroundColor: colorStyle.subText, height: (1 * oneCell) * 0.7, width: (1 * oneCell) * 0.7 }} >
          <Ionicons name={'medical'} size={29} color={colorStyle.mainText} />
        </TouchableOpacity>
        <TouchableOpacity className=' overflow-hidden items-center justify-center' style={{ borderRadius: 12, backgroundColor: colorStyle.subText, height: (1 * oneCell) * 0.7, width: (1 * oneCell) * 0.7 }} >
          <Ionicons name={'medical'} size={29} color={colorStyle.mainText} />
        </TouchableOpacity>
        <TouchableOpacity className=' overflow-hidden items-center justify-center' style={{ borderRadius: 12, backgroundColor: colorStyle.subText, height: (1 * oneCell) * 0.7, width: (1 * oneCell) * 0.7 }} >
          <Ionicons name={'medical'} size={29} color={colorStyle.mainText} />
        </TouchableOpacity>
        <Text style={[fontstyles.homebig, { marginBottom: -1, color: colorStyle.mainText }]}>{withOBDhub ? 'With OBDHub' : 'With Location'}</Text>
        <TouchableOpacity onPress={() => setWithOBDhub(!withOBDhub)} className='bg'>
          <Ionicons name='toggle' size={38} style={{ transform: [{ rotate: withOBDhub ? '0deg' : '180deg' }] }} color={withOBDhub ? colorStyle.diffBlue : colorStyle.mainText} />
        </TouchableOpacity>
      </View> */}

      <View className='flex-row justify-center items-center '>

        <View style={{ backgroundColor: '#101010' }} className=' absolute left-0 z-50 overflow-hidden rounded-full items-center justify-center border-2 border-cyan-200 p-1'>
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
                { rotate: `${-130 + converted(currentSpeed, maxSpeed)}deg` }, // Rotation to align with progress
                { translateY: -57 } // Move the indicator to start from the center
              ],
            }} />
          <Speedo opacity={0.3} color1persentage={180} color2persentage={264} colorsmall1persentage={40} colorsmall2persentage={60} onlyBG={true} />
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
            <Speedo opacity={1} color1persentage={converted(currentSpeed, maxSpeed)} color2persentage={converted(currentSpeed, maxSpeed)} colorsmall1persentage={35} colorsmall2persentage={35} maxSpeed={maxSpeed} />
          </View>
        </View>

        <View className=' border-y-2 border-cyan-200 items-center'>
          <View className=' z-50 flex-row justify-between' style={{ width: widths - 20 }}>
            <MaterialCommunityIcons style={{ paddingHorizontal: 32, width: '50%' }} onPress={() => setIndicator(indicator.includes('left') ? 'off' : 'left')} name='chevron-triple-left' size={28} color={indicator == 'left' ? colorStyle.diffBlue : colorStyle.subText} />
            <MaterialCommunityIcons style={{ paddingHorizontal: 32, transform: [{ rotate: withOBDhub ? '0deg' : '180deg' }], padding: 2, width: '50%', alignItems: 'flex-end' }} onPress={() => setIndicator(indicator == 'right' ? 'off' : 'right')} name='chevron-triple-left' size={28} color={indicator == 'right' ? colorStyle.diffBlue : colorStyle.subText} />
          </View>
          <View style={{ width: widths }} >
            <Animated.FlatList
              data={data}
              pagingEnabled
              // bounces
              ref={ref}
              onScroll={Animated.event(
                [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                { useNativeDriver: false }
              )}
              renderItem={({ index, item }) => (
                <View style={{ width: widths }} className=' h-40 items-center'>
                  <Text style={{ color: colorStyle.diffYellow }}>{item.label.replace(/\b\w/g, char => char.toUpperCase()).replace(/-/g, ' ')}</Text>
                  {/* {console.log(scrollX)} */}
                </View>
              )}
              keyExtractor={(item) => item.key}
              horizontal
              showsHorizontalScrollIndicator={false}
            />
            <ScrollView horizontal className=' h-8 w-full overflow-visible' >
              <Tabs scrollX={scrollX} data={data} onItemPress={onItemPress} selectedIndex={selectedIndex} setSelectedIndex={setSelectedIndex} />
            </ScrollView>
          </View>
        </View>

        <View style={{ backgroundColor: '#101010' }} className=' right-0 absolute z-50 overflow-hidden rounded-full items-center justify-center border-2 border-cyan-200 p-1'>
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
                { rotate: `${-130 + converted(currentRPM, maxRPM)}deg` }, // Rotation to align with progress
                { translateY: -57 } // Move the indicator to start from the center
              ],
            }} />
          <Speedo opacity={0.3} color1persentage={180} color2persentage={264} colorsmall1persentage={40} colorsmall2persentage={60} onlyBG={true} />
          <View className='border-2 border-cyan-200 p-2 z-20 absolute rounded-full items-center justify-center' style={{
            shadowColor: colorStyle.mainText,
            shadowOpacity: 0.26,
            shadowOffset: { width: -1, height: -3 },
            shadowRadius: 10,
            elevation: 30,
            backgroundColor: 'white',
            width: oneCell * 1.8, height: oneCell * 1.8, backgroundColor: colorStyle.mainBg
          }}>
            <Text style={[fontstyles.numlight, { fontSize: 50, marginBottom: -1, color: colorStyle.mainText }]}>{currentRPM}</Text>
            <Text style={[fontstyles.home, { marginBottom: 1, color: colorStyle.mainText }]}>X1000RPM</Text>
          </View>

          <View style={{ backgroundColor: colorStyle.mainBg }} className='absolute flex-row bottom-16 h-10 w-16 z-50' />
          <View className=' absolute'>
            <Speedo opacity={1} color1persentage={converted(currentRPM, maxRPM)} color2persentage={converted(currentRPM, maxRPM)} colorsmall1persentage={35} colorsmall2persentage={35} maxSpeed={maxRPM} />
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
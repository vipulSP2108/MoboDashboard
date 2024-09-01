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

import { View, Text, StyleSheet, TouchableOpacity, Animated, ScrollView } from 'react-native'
import React, { useContext, useEffect, useRef, useState } from 'react'
import FontStyles from '../Styles/FontStyle';
import useColorStyle from '../Styles/ColorStyle';
import { GlobalStateContext } from '../Context/GlobalStateProvider';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import Speedo2 from '../Components/Speedo2';
import Recording from '../Components/Recording';
import AddLocation from '../Components/AddLocation';



export default function GridScreen() {
  const { oneGap, oneCell } = useContext(GlobalStateContext);
  const colorStyle = useColorStyle();
  const fontstyles = FontStyles();

  const data = [
    // { key: 'Item 1', label: 'decagram', ref: React.createRef() },
    { key: 'Item 2', label: 'car-battery', ref: React.createRef() },
    {
      key: 'Item 3', label: 'navigation-variant', ref: React.createRef(),
      content: (<>
        <View className=' flex-row items-center justify-center mr-2'>
          <MaterialCommunityIcons name='arrow-left-top-bold' size={44} color={colorStyle.diffGreen} />
          <Text style={[fontstyles.clock, { fontSize: 25, color: colorStyle.mainText }]}>900</Text>
          <Text style={[fontstyles.homebold, { color: colorStyle.mainText }]}> m</Text>
        </View>
        <Text style={[fontstyles.homebold, { color: colorStyle.subText }]}>Take Exit to EH1</Text>
      </>)
    },
    // car-brake-low-pressure car-brake-parking car-brake-retarder car-brake-temperature
    { key: 'Item 4', label: 'leaf', ref: React.createRef() },
    { key: 'Item 5', label: 'car-light-high', ref: React.createRef() }, //car-light-dimmed car-parking-lights car-light-alert
    { key: 'Item 6', label: 'shield-car', ref: React.createRef() },
    { key: 'Item 7', label: 'car-shift-pattern', ref: React.createRef() },
    { key: 'Item 8', label: 'car-speed-limiter', ref: React.createRef() },
    { key: 'Item 9', label: 'fuel', ref: React.createRef() },
    // { key: 'Item 10', label: 'decagram', ref: React.createRef() },
  ];

  const [vegMode, setVegMode] = useState();
  const [withOBDhub, setWithOBDhub] = useState(false);

  const maxSpeed = 180;
  const currentSpeed = 121;

  const maxRPM = 9;
  const currentRPM = 3.7;

  const widths = 170;
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

  const converted = (value, max) => {
    // (264 / maxSpeed) * 260;
    return (72 / max) * value;
  }

  const Tabs = ({ scrollX, data, onItemPress, selectedIndex, setSelectedIndex }) => {
    return (
      <View>
        <View className=' flex-row'>
          {data.map((item, index) => {
            return (
              <TouchableOpacity onPress={() => onItemPress(index)}>
                {/* {console.log(selectedIndex)} */}
                <View className='z-50 px-2' ref={item.ref}>
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

  const date = new Date();

  const getDay = () => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[date.getDay()];
  }

  return (
    <>
      <View style={{ padding: 5, backgroundColor: colorStyle.mainBg, flex: 1, justifyContent: 'center' }}>
        <View className=' top-4 flex-row justify-center items-center '>
          <View style={{ backgroundColor: colorStyle.mainBg }} className=' z-10 absolute left-0 rounded-full items-center justify-center'>
            <Speedo2 gcolor={colorStyle.diffBlue} g2color={colorStyle.diffBlue} percentage={converted(currentSpeed, maxSpeed)} />
            <View
              style={{
                position: 'absolute',
                zIndex: 10,
                // transform: [{ rotate: '180deg' }],
                width: 25,
                // height: ,
                borderLeftWidth: 11, borderRightWidth: 11,
                borderBottomWidth: 70,
                borderLeftColor: 'transparent',
                borderRightColor: 'transparent',
                borderBottomColor: 'red',
                shadowColor: 'red',
                elevation: 20,
                transform: [
                  { translateX: 1 }, // Center the indicator horizontally
                  { rotate: `${(currentSpeed * (264 / maxSpeed)) - 130}deg` }, // Rotation to align with progress
                  { translateY: -57 } // Move the indicator to start from the center
                ],
              }} />
            <View className={` p-2 z-20 absolute rounded-full items-center justify-center`} style={{
              borderColor: colorStyle.diffBlue,
              borderWidth: 1,
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
          </View>

          <View className=' z-50 -top-10 absolute flex-row justify-center items-center'>
            <Text style={[fontstyles.homebig, { marginBottom: -2, color: colorStyle.mainText }]}>{withOBDhub ? 'With OBDHub' : 'With Location'}</Text>
            <TouchableOpacity className='ml-2 items-center justify-center' onPress={() => setWithOBDhub(!withOBDhub)}>
              <View style={{ backgroundColor: withOBDhub ? colorStyle.subBg : colorStyle.subBg }} className=' absolute w-9 h-5 rounded-full' />
              <Ionicons name='toggle' size={38} style={{ transform: [{ rotate: withOBDhub ? '0deg' : '180deg' }] }} color={withOBDhub ? colorStyle.mainText : colorStyle.mainText} />
            </TouchableOpacity>
          </View>


          <View className='z-50 overflow-hidden items-center'>
            {/* <View className=' flex-row justify-center items-center mb-8' style={{ width: widths - 20 }}>
            <Text style={[fontstyles.homebig, { marginBottom: -2, color: colorStyle.mainText }]}>{withOBDhub ? 'With OBDHub ' : 'With Location '}</Text>
            <TouchableOpacity onPress={() => setWithOBDhub(!withOBDhub)} className='bg'>
              <Ionicons name='toggle' size={38} style={{ transform: [{ rotate: withOBDhub ? '0deg' : '180deg' }] }} color={withOBDhub ? colorStyle.diffBlue : colorStyle.mainText} />
            </TouchableOpacity>
          </View> */}

            {/* <MaterialCommunityIcons style={{ paddingHorizontal: 32, width: '50%' }} onPress={() => setIndicator(indicator.includes('left') ? 'off' : 'left')} name='chevron-triple-left' size={28} color={indicator == 'left' ? colorStyle.diffBlue : colorStyle.subText} />
            <MaterialCommunityIcons style={{ paddingHorizontal: 32, transform: [{ rotate: withOBDhub ? '0deg' : '180deg' }], padding: 2, width: '50%', alignItems: 'flex-end' }} onPress={() => setIndicator(indicator == 'right' ? 'off' : 'right')} name='chevron-triple-left' size={28} color={indicator == 'right' ? colorStyle.diffBlue : colorStyle.subText} /> */}

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
                    <Text style={[fontstyles.home, { color: colorStyle.mainText }]}>{item.label.replace(/\b\w/g, char => char.toUpperCase()).replace(/-/g, ' ')}</Text>
                    <View className=' items-center justify-center flex-1'>
{item.content && item.content}
                    </View>
                  </View>
                )}
                keyExtractor={(item) => item.key}
                horizontal
                showsHorizontalScrollIndicator={false}
              />
              <ScrollView horizontal className='h-8 w-full z-50 overflow-visible' >
                <Tabs scrollX={scrollX} data={data} onItemPress={onItemPress} selectedIndex={selectedIndex} setSelectedIndex={setSelectedIndex} />
              </ScrollView>
            </View>
          </View>


          <View style={{ backgroundColor: colorStyle.mainBg }} className=' z-10 rounded-full absolute right-0 items-center justify-center'>
            <Speedo2 gcolor={colorStyle.diffYellow} g2color={colorStyle.diffYellow} percentage={converted(currentRPM, maxRPM)} />
            <View
              style={{
                position: 'absolute',
                zIndex: 10,
                // transform: [{ rotate: '180deg' }],
                width: 25,
                // height: ,
                borderLeftWidth: 11, borderRightWidth: 11,
                borderBottomWidth: 70,
                borderLeftColor: 'transparent',
                borderRightColor: 'transparent',
                borderBottomColor: 'red',
                shadowColor: 'red',
                elevation: 20,
                transform: [
                  { translateX: 1 }, // Center the indicator horizontally
                  { rotate: `${(currentRPM * (264 / maxRPM)) - 130}deg` }, // Rotation to align with progress
                  { translateY: -57 } // Move the indicator to start from the center
                ],
              }} />
            <View className={` p-2 z-20 absolute rounded-full items-center justify-center`} style={{
              borderColor: colorStyle.diffBlue,
              borderWidth: 1,
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
          </View>


        </View>

      </View>
      <View style={{ backgroundColor: colorStyle.mainBg }} className=' z-50 flex-row items-center justify-between px-3 py-1'>
        <View>
          <View className=' flex-row items-baseline'>
            <Text style={[fontstyles.numsmall, { marginBottom: -4, fontSize: 21, color: colorStyle.mainText }]}>{date.getHours().toString().padStart(2, '0')}</Text>
            <Text style={{ color: colorStyle.mainText }} className=' text-xl'> : </Text>
            <Text style={[fontstyles.numsmall, { fontSize: 21, color: colorStyle.mainText }]}>{date.getMinutes().toString().padStart(2, '0')}</Text>
            <Text style={[fontstyles.home, { color: colorStyle.subText }]}>    {date.getDate().toString().padStart(2, '0')}/{(date.getMonth() + 1).toString().padStart(2, '0')}</Text>
          </View>
          <Text style={[fontstyles.home, { color: colorStyle.mainText }]}>{getDay()}</Text>
        </View>
        <View className=' flex-row' style={{ gap: oneGap * 0.7 }}>
          <TouchableOpacity className=' overflow-hidden items-center justify-center' style={{ borderRadius: 12, backgroundColor: colorStyle.subBg, height: (1 * oneCell) * 0.7, width: (1 * oneCell) * 0.7 }} >
            <Recording />
          </TouchableOpacity>
          <TouchableOpacity className='gap-x-1 flex-row overflow-hidden items-center justify-center' style={{ borderRadius: 12, backgroundColor: colorStyle.subBg, height: (1 * oneCell) * 0.7, width: (3 * oneCell) * 0.7 + 3 * (oneGap * 0.7) }} >
            {/* <Ionicons name={'medical'} size={29} color={colorStyle.mainText} /> */}
            <View style={{ backgroundColor: colorStyle.iconBg, transform: [{ rotate: '-45deg' }] }} className=' items-center justify-center h-9 w-9 rounded-full mr-2' >
              <View style={{ backgroundColor: colorStyle.mainBg, shadowColor: 'white', elevation: 12 }} className=' absolute items-center justify-center h-4 w-4 rounded-full mr-2' />
              <View>
                <Ionicons name='musical-note' size={25} color={colorStyle.diffGreen} />
              </View>
            </View>
            <Ionicons name='play-skip-back-circle' size={30} color={colorStyle.mainText} />
            <Ionicons name={'play-circle'} size={45} color={colorStyle.mainText} />
            <Ionicons name='play-skip-forward-circle' size={30} color={colorStyle.mainText} />
            {/* <Recording /> */}
          </TouchableOpacity>
          <TouchableOpacity className=' overflow-hidden items-center justify-center' style={{ borderRadius: 12, backgroundColor: colorStyle.subBg, height: (1 * oneCell) * 0.7, width: (1 * oneCell) * 0.7 }} >
            <AddLocation />
          </TouchableOpacity>
        </View>
        <View className=' justify-end items-end'>
          <View className=' flex-row items-baseline'>
            <Text style={[fontstyles.numsmall, { marginBottom: -4, fontSize: 21, color: colorStyle.mainText }]}>{18}</Text>
            <Text style={{ color: colorStyle.mainText }} className=' text-xl'>°</Text>
            <Text style={[fontstyles.numsmall, { fontSize: 21, color: colorStyle.mainText }]}>{'C'}</Text>
            <Text style={[fontstyles.home, { color: colorStyle.subText }]}>    {'10 MPH'}</Text>
          </View>
          <Text style={[fontstyles.home, { color: colorStyle.mainText }]}>{'Cloudy'}</Text>
        </View>
      </View>
    </>
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
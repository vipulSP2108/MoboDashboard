import React, { useState, useEffect, useContext } from 'react';
import { View, Button, Alert, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import * as FileSystem from 'expo-file-system';
import { Audio } from 'expo-av';
import CustomModal from './CostomModel';
import useColorStyle from '../Styles/ColorStyle';
import FontStyles from '../Styles/FontStyle';
import { GlobalStateContext } from '../Context/GlobalStateProvider';
import { Ionicons } from '@expo/vector-icons';
import Icons from './Icons';
import { Image } from 'react-native';
import { Text } from 'react-native';

const Recording = () => {
    const { oneCell, setOneCell, oneGap } = useContext(GlobalStateContext)
    const colorStyle = useColorStyle();
    const fontstyles = FontStyles();
    const [isSaveFileModalVisible, setIsSaveFileModalVisible] = useState(false);
    const [isRecordingModalVisible, setIsRecordingModalVisible] = useState(false);
    const [recordingUri, setRecordingUri] = useState(null);
    const [recording, setRecording] = useState(null);
    const [isRecording, setIsRecording] = useState(false);

    useEffect(() => {
        const requestPermissions = async () => {
            const { status } = await Audio.requestPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert('Permission required', 'Please grant audio recording permissions.');
            }
        };
        requestPermissions();
    }, []);

    const startRecording = async () => {
        try {
            const { recording } = await Audio.Recording.createAsync(
                Audio.RecordingOptionsPresets.HIGH_QUALITY
            );
            setRecording(recording);
            setIsRecording(true);
        } catch (error) {
            console.error('Error starting recording:', error);
        }
    };

    const stopRecording = async () => {
        try {
            if (recording) {
                await recording.stopAndUnloadAsync();
                const uri = recording.getURI();
                setRecordingUri(uri);
                setIsRecording(false);
                setRecording(null);
                setIsSaveFileModalVisible(true);
            }
        } catch (error) {
            console.error('Error stopping recording:', error);
        }
    };

    const moveFile = async (sourceUri, destinationUri) => {
        try {
            await FileSystem.moveAsync({
                from: sourceUri,
                to: destinationUri,
            });
            console.log('File moved successfully');
        } catch (error) {
            console.error('Error moving file:', error);
        }
    };

    const handleSave = async (fileName) => {
        if (recordingUri) {
            const destinationUri = `${FileSystem.documentDirectory}MyAppName/Recordings/${fileName}.m4a`;
            await moveFile(recordingUri, destinationUri);
            setIsSaveFileModalVisible(false);
            Alert.alert('File saved at', destinationUri);
        }
    };

    const [fileName, setFileName] = useState('');

    // const { oneCell, setOneCell, oneGap } = useContext(GlobalStateContext)

    const [isplay, setIsplay] = useState(false);

    return (
        <View>
            <TouchableOpacity onPress={() => setIsRecordingModalVisible(true)} className='p-2 justify-center items-center' style={{ borderRadius: 12, backgroundColor: colorStyle.subBg, height: (1 * oneCell), width: (1 * oneCell) - (0.5 * oneGap) }}>
                <View className=' items-center justify-center p-2' style={{ borderRadius: 12, backgroundColor: colorStyle.iconBg }}>
                    <Ionicons name={'recording'} size={0.45 * oneCell} color={colorStyle.diffBlue} />
                </View>
            </TouchableOpacity>
            <CustomModal
                visible={isRecordingModalVisible}
                setVisible={setIsRecordingModalVisible}
                content={
                    <>
                        <TouchableOpacity style={{ position: 'absolute', flex: 1, backgroundColor: 'red' }} onPress={() => setIsRecordingModalVisible(false)} />

                            <View style={{
                                padding: 12,
                                width: oneCell * 3 + 2 * oneGap,
                                height: oneCell * (isRecording ? 3 : 2),
                                backgroundColor: colorStyle.subBg,
                                borderRadius: 12,
                                overflow: 'hidden',
                            }}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <Icons
                                        iconName={'bulb'}
                                        mainTextContent={'Voice Recorder'}
                                        subTextContent={`Status : ${isplay ? 'On' : 'Off'}`}
                                    />
                                    <Ionicons onPress={() => setIsRecordingModalVisible(false)} name={'close-circle'} size={25} color={colorStyle.mainText} />
                                </View>
                                {isRecording && <Image
                                    source={require('./../../assets/images/sound.gif')}
                                    resizeMode='center'
                                    style={{
                                        top: 15,
                                        zIndex: -20,
                                        transform: [{ scale: 2.1 }],
                                        width: '100%',
                                        height: '100%',
                                        position: 'absolute',
                                        opacity: 0.3,
                                    }}
                                />}
                                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-end', bottom: 5 }}>
                                    {!isRecording ? <Ionicons onPress={startRecording} name={'play-circle'} size={45} color={colorStyle.mainText} />
                                        : <Ionicons onPress={stopRecording} name={'checkmark-done-circle'} size={45} color={colorStyle.mainText} />}
                                </View>
                            </View>
                    </>
                }
            />
            <CustomModal
                visible={isSaveFileModalVisible}
                setVisible={setIsSaveFileModalVisible}
                backTabON={false}
                content={
                    <>
                        <View style={styles.modalBackground}>
                            <View style={styles.modalContainer}>
                                <Text style={styles.modalTitle}>Enter Filename</Text>
                                <TextInput
                                    value={fileName}
                                    onChangeText={setFileName}
                                    placeholder="Filename"
                                    style={styles.input}
                                />
                                <View style={styles.buttonContainer}>
                                    <Button title="Save" onPress={() => handleSave(fileName)} />
                                    <Button title="Back" onPress={() => setIsSaveFileModalVisible(false)} />
                                </View>
                            </View>
                        </View>
                    </>
                }
            />
        </View>
    );
};

const styles = StyleSheet.create({
    modalBackground: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContainer: {
      width: '80%',
      backgroundColor: 'white',
      borderRadius: 10,
      padding: 20,
      alignItems: 'center',
    },
    modalTitle: {
      fontSize: 18,
      marginBottom: 10,
    },
    input: {
      width: '100%',
      borderBottomWidth: 1,
      marginBottom: 20,
      padding: 10,
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
    },
  });

export default Recording;

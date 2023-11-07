import React, { useState, useEffect } from 'react';
import { Platform, Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import Device from 'expo-device';
import * as Location from 'expo-location';
import * as ImagePicker from 'expo-image-picker';
import { Linking } from 'react-native';
import { app } from '../firebase';
import { getAuth } from "firebase/auth";
import { useNavigation } from '@react-navigation/native';

export default function CamMaps() {
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);

    const navigation = useNavigation()
    const auth = getAuth(app);

    const handleSignOut = () => {
        auth
            .signOut()
            .then(() => {
                navigation.replace("Login")
            })
            .catch((error) => {
                console.error(error);
            }
            );
    }

    useEffect(() => {
        (async () => {
            if (Platform.WEB === 'web' && !Device.isDevice) {
                setErrorMsg(
                    'Oops, this will not work on Snack in an Android Emulator. Try it on your device!'
                );
                return;
            }
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);
        })();
    }, []);

    const takePictureAndOpenMaps = async () => {
        let result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.cancelled && location) {
            const { latitude, longitude } = location.coords;
            const url = Platform.select({
                ios: `maps://app?ll=${latitude},${longitude}`,
                android: `geo:${latitude},${longitude}?q=${latitude},${longitude}`,
            });
            Linking.openURL(url);
        }
    };

    let text = 'Waiting..';
    if (errorMsg) {
        text = errorMsg;
    } else if (location) {
        text = JSON.stringify(location);
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.teksMaps} onPress={takePictureAndOpenMaps}>
                <Text style={styles.paragraf2}>Take a picture and open Maps</Text>
            </TouchableOpacity>
            <Text style={styles.paragraph}>{text}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    teksMaps: {
        backgroundColor: '#007BFF',
        padding: 10,
        borderRadius: 5,
        marginTop: 20,
    },
    paragraph: {
        fontSize: 18,
        textAlign: 'center',
    },
    paragraf2: {
        fontSize: 18,
        textAlign: 'center',
        color: 'white',
    }
});
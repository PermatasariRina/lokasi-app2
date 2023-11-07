import { StyleSheet, Text, View, KeyboardAvoidingView, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { app } from '../firebase';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native'; 

const LoginScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigation = useNavigation();

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) {
                navigation.replace('Home');
            }
        })

        return unsubscribe
    }, [])

    const auth = getAuth(app);

    const handleSignUp = () => {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log('Registered with: ', user.email);
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.error('Error:', errorCode, errorMessage);
            });
    }

    const handleLogin = () => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log('Logged in with: ', user.email);
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.error('Error:', errorCode, errorMessage);
            });
    }


    return (
        <KeyboardAvoidingView style={styles.container} behavior='padding'>
            <View style={styles.inputContainer}>
                <TextInput
                    placeholder='Email'
                    value={email}
                    onChangeText={text => setEmail(text)}
                    style={styles.input} />
                <TextInput
                    placeholder='Password'
                    value={password}
                    onChangeText={text => setPassword(text)}
                    style={styles.input}
                    secureTextEntry />
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    onPress={handleLogin}
                    style={styles.button} >
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={handleSignUp}
                    style={[styles.button, styles.buttonOutLine]} >
                    <Text style={styles.buttonOutLineText}>Register</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    inputContainer: {
        width: '80%',
    },
    input: {
        backgroundColor: '#fff',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 5,
    },
    buttonContainer: {
        width: '60%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
    },
    button: {
        backgroundColor: '#39A7FF',
        width: '100%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
    },
    buttonOutLine: {
        backgroundColor: '#fff',
        marginTop: 10,
        borderColor: '#39A7FF',
        borderWidth: 2,
    },
    buttonText: {
        color: '#fff',
        fontWeight: '700',
        fontSize: 16,
    },
    buttonOutLineText: {
        color: '#000',
    }
})
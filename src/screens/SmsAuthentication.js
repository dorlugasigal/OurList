import React, { useContext, useRef, useState } from 'react'
import { StyleSheet, View, Button, Dimensions, StatusBar, TextInput } from 'react-native'
import { Context as AuthContext } from "../context/AuthContext"
import { Text } from "react-native-elements"
import * as Animatable from "react-native-animatable"


const SmsAuthentication = ({ navigation: { navigate }, route: { params: { phoneNumber } } }) => {
    const { state, signIn } = useContext(AuthContext)
    const [isValid, setIsValid] = useState(false)
    const { height } = Dimensions.get("screen")

    const [pin1, setPin1] = useState("")
    const [pin2, setPin2] = useState("")
    const [pin3, setPin3] = useState("")
    const [pin4, setPin4] = useState("")
    const inputRef1 = useRef(null)
    const inputRef2 = useRef(null)
    const inputRef3 = useRef(null)
    const inputRef4 = useRef(null)

    const otp = `${pin1}${pin2}${pin3}${pin4}`

    const validateInput = () => {
        setIsValid(!pin1 || !pin2 || !pin3 || !pin4)
    }
    const verifyOtp = () => {
        if (otp === "1234") {
            signIn("Dor Lugasi")
        }
    }

    const changeDataAndFocusNext = (data, currentPin) => {
        eval(`setPin${currentPin}`)(data)
        if (currentPin == 4) {
            validateInput()
        } else {
            if (!data) return
            eval(`inputRef${currentPin + 1}`).current.focus();
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Animatable.Image
                    animation="bounceIn"
                    duration={800}
                    source={require("../../assets/logo.png")}
                    style={{ height: height * 0.15, width: height * 0.15 }}
                />
                <View style={styles.welcomeTextContainer}>
                    <Text style={styles.welcomeTextHeader} h3 >Verification Code</Text>
                    <Text style={styles.welcomeText} >Please type the verification code sent to {phoneNumber}.</Text>
                </View>
            </View>
            <Animatable.View
                animation="fadeInUpBig"
                duration={600}
                style={styles.footer}
                behavior="padding"
            >
                <View style={styles.inputContainer}>
                    <TextInput
                        keyboardType="number-pad"
                        maxLength={1}
                        style={styles.otpChar}
                        ref={inputRef1}
                        value={pin1}
                        onKeyPress={({ nativeEvent }) => {
                            nativeEvent.key === 'Backspace' ? inputRef1.current.focus() : null
                        }}
                        onChangeText={(data) => changeDataAndFocusNext(data, 1)}
                    />
                    <TextInput keyboardType="number-pad"
                        maxLength={1}
                        style={styles.otpChar}
                        ref={inputRef2}
                        value={pin2}
                        onChangeText={(data) => changeDataAndFocusNext(data, 2)}
                        onKeyPress={({ nativeEvent }) => {
                            nativeEvent.key === 'Backspace' ? inputRef1.current.focus() : null
                        }}
                    />
                    <TextInput
                        keyboardType="number-pad"
                        maxLength={1}
                        style={styles.otpChar}
                        ref={inputRef3}
                        value={pin3}
                        onChangeText={(data) => changeDataAndFocusNext(data, 3)}
                        onKeyPress={({ nativeEvent }) => {
                            nativeEvent.key === 'Backspace' ? inputRef2.current.focus() : null
                        }}
                    />
                    <TextInput
                        keyboardType="number-pad"
                        maxLength={1}
                        style={styles.otpChar}
                        ref={inputRef4}
                        value={pin4}
                        onChangeText={(data) => changeDataAndFocusNext(data, 4)}
                        onKeyPress={({ nativeEvent }) => {
                            nativeEvent.key === 'Backspace' ? inputRef3.current.focus() : null
                        }}
                    />
                </View>

                <Button disabled={!isValid} title="Verify" onPress={verifyOtp} />
            </Animatable.View>
            <StatusBar style="auto" />
        </View >

    );
}
export default SmsAuthentication


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#3f2d5c"
    },
    header: {
        flex: 3,
        justifyContent: "center",
        alignItems: "center"
    },
    footer: {
        flex: 1,
        backgroundColor: "#fff",
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 30,
        paddingVertical: 50,
    },

    inputContainer: {
        paddingTop: 10,
        flexDirection: "row"
    },
    otpChar: {
        flex: 1,
        backgroundColor: "#AAA",
        paddingHorizontal: 5,
        paddingVertical: 10,
        margin: 10,
        textAlign: "center",
        borderRadius: 10
    }, welcomeTextContainer: {
        paddingHorizontal: 30,
        marginTop: 30,
        alignItems: 'center'
    },
    welcomeTextHeader: {
        color: "#d8ccff",
    },
    welcomeText: {
        color: "#FFF",
        textAlign: "center"
    }
})

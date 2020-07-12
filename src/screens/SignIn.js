import React, { useContext, useState, useEffect } from 'react'
import { StyleSheet, View, Button, Dimensions, StatusBar, } from 'react-native'
import { Context as AuthContext } from "../context/AuthContext"
import { Image, Input, Icon, Text } from 'react-native-elements'
import * as Animatable from "react-native-animatable"
//import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'


const SignIn = ({ navigation: { navigate } }) => {
    const { state, restoreToken } = useContext(AuthContext)
    const [phoneNumber, setPhoneNumber] = useState("")
    const { height } = Dimensions.get("screen")


    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Animatable.Image
                    animation="bounceIn"
                    duration={800}
                    source={require("../../assets/logo.png")}
                    style={{ height: height * 0.2, width: height * 0.2 }}
                />
                <View style={styles.welcomeTextContainer}>
                    <Text style={styles.welcomeTextHeader} h3 >Verify Your Number</Text>
                    <Text style={styles.welcomeText} >Please enter your phone number. You will get a SMS including a verification code.</Text>
                </View>

            </View>
            <Animatable.View
                animation="fadeInUpBig"

                style={styles.footer}
                behavior="padding"
            >
                <View style={styles.phoneInputContainer}>
                    <View style={styles.prefixContainer}>
                        <Text style={styles.prefix}>(+972)</Text>
                        <Image source={{ uri: "https://www.countryflags.io/il/shiny/64.png" }} style={{ width: 20, height: 20, alignContent: "center" }} />
                    </View>
                    <View style={styles.inputContainer}>
                        <Input
                            placeholder="Mobile Number"
                            keyboardType="number-pad"
                            underlineColorAndroid="transparent"
                            onChangeText={setPhoneNumber}
                        />
                    </View>
                </View>
                <Button title="Send" onPress={() => signIn({ phoneNumber })} />
            </Animatable.View>
            <StatusBar style="auto" />
        </View >

    );
}
export default SignIn


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
    phonePrefix: {
        backgroundColor: "gray",
        alignSelf: "center",

    },
    footer: {
        flex: 1,
        backgroundColor: "#fff",
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 30,
        paddingVertical: 50,
    },
    phoneInputContainer: {
        height: 70,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    inputContainer: {
        paddingTop: 10,
        flex: 1
    },
    prefix: {
        color: "gray"
    },
    prefixContainer: {
        alignItems: "center",
        justifyContent: "center",
    },
    welcomeTextContainer: {
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

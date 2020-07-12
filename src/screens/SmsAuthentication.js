import React, { useContext, useState, useEffect } from 'react'
import { StyleSheet, View, Button, Dimensions, StatusBar, } from 'react-native'
import { Context as AuthContext } from "../context/AuthContext"
import { Image, Input, Icon, Text } from 'react-native-elements'
import * as Animatable from "react-native-animatable"


const SmsAuthentication = ({ navigation: { navigate }, route: { params: { phoneNumber } } }) => {
    const { state, restoreToken } = useContext(AuthContext)
    const { height } = Dimensions.get("screen")

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
                <View style={styles.inputContainer}></View>
                <Button title="Verify" onPress={() => { }} />
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

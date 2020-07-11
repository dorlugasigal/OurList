import React, { useContext, useState, useEffect } from 'react'
import { StyleSheet, View, Button, Dimensions, StatusBar, Animated, Keyboard, KeyboardAvoidingView } from 'react-native'
import { Context as AuthContext } from "../context/AuthContext"
import { SocialIcon, Input, Icon, Text } from 'react-native-elements'
import * as Animatable from "react-native-animatable"

const GetStarted = ({ navigation: { navigate } }) => {

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

            </View>
            <Animatable.View
                animation="fadeInUpBig"
                style={styles.footer}
            >
                <SocialIcon
                    title='Sign In With Facebook'
                    button
                    type='facebook'
                />
                <Text h5 style={styles.divider}>Or</Text>
                <Button title="Use the old sign in options" onPress={() => navigate("SignIn")} />
            </Animatable.View>
            <StatusBar style="auto" />
        </View >
    )
}

export default GetStarted

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#3f2d5c"
    },
    header: {
        flex: 2,
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
    divider: {
        color: "gray",
        paddingVertical: 10,
        textAlign: "center"
    },
})

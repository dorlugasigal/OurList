import React, { useContext, useState, useEffect } from 'react'
import { StyleSheet, View, Dimensions, StatusBar, Alert, Text } from 'react-native'
import { Context as AuthContext } from "../context/AuthContext"
import * as Facebook from 'expo-facebook';
import { SocialIcon, Button } from 'react-native-elements'
import * as Animatable from "react-native-animatable"


const GetStarted = ({ navigation: { navigate } }) => {


    const { height } = Dimensions.get("screen")
    const login = async () => {
        try {
            await Facebook.initializeAsync("1429991460507265");
            const {
                type,
                token,
                expires,
                permissions,
                declinedPermissions,
            } = await Facebook.logInWithReadPermissionsAsync({
                permissions: ['public_profile', "user_friends"],
                appId: '1429991460507265',
                appName: "OurList"
            });
            if (type === 'success') {
                // Get the user's name using Facebook's Graph API
                const res = await fetch(`https://graph.facebook.com/me?access_token=${token}`);
                var me = await res.json();
                const response = await fetch(`https://graph.facebook.com/v7.0/${me.id}/friends?access_token=${token}`);
                var friends = await response.json();
                const picture = await fetch(`https://graph.facebook.com/v7.0/${friends.data[0].id}/picture?access_token=${token}&type=normal&height=100&width=100`);
                Alert.alert('Logged in!', `Hi ${me.name}!`);
            } else {
                // type === 'cancel'
            }
        } catch ({ message }) {
            console.log(message)
            alert(`Facebook Login Error: ${message}`);
        }
    }
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Animatable.Image
                    animation="bounceIn"
                    duration={800}
                    source={require("../../assets/logo.png")}
                    style={{ height: height * 0.2, width: height * 0.2, margin: 30 }}
                />
                <Text fontFamily="Cochin" style={styles.headerStyle}>OurList</Text>
                <Text style={styles.secondaryHeaderStyle}> glad to see you here</Text>
            </View>
            <Animatable.View
                duration={1000}
                animation="fadeInUpBig"
                style={styles.footer}
            >
                <Text style={styles.welcomeMessage}>Log in to OurList</Text>

                <SocialIcon
                    title='Sign In With Facebook'
                    button
                    fontFamily={"Montserrat"}
                    style={{ marginHorizontal: 0, marginVertical: 10 }}
                    type='facebook'
                    onPress={login}
                />
                <Button title='Use your phone number instead'
                    button
                    type='outline'
                    buttonStyle={{ borderRadius: 1000, padding: 10 }}
                    onPress={() => navigate("SignIn")} >
                </Button>
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
        flex: 3,
        justifyContent: "center",
        alignItems: "center"
    },
    footer: {
        flex: 1,
        backgroundColor: "#fff",
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 50,
        paddingTop: 20,
        paddingBottom: 50,
        shadowColor: 'rgba(35,21,42,0.5)',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 1,
        shadowRadius: 1,

    },
    textStyle: {
        color: "gray",
        paddingVertical: 10,
        textAlign: "center",
    },
    headerStyle: {
        fontSize: 40,
        color: "#d8ccff",
        textAlign: "center"
    },
    secondaryHeaderStyle: {
        color: "#FFF",
        fontSize: 20,
        textAlign: "center",
    },
    welcomeMessage: {
        color: "gray",
        fontSize: 20,
        textAlign: "center",
        padding: 10
    }
})

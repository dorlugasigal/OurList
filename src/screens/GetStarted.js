import React, { useContext, useState, useEffect } from 'react'
import { StyleSheet, View, Dimensions, StatusBar, } from 'react-native'
import { Context as AuthContext } from "../context/AuthContext"
import { SocialIcon, Text } from 'react-native-elements'
import * as Animatable from "react-native-animatable"
import { TouchableOpacity } from 'react-native-gesture-handler'

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
                setFriends(friends)
                const picture = await fetch(`https://graph.facebook.com/v7.0/${friends.data[0].id}/picture?access_token=${token}&type=normal&height=100&width=100`);
                setPicture(picture.url)
                console.log(`${me.name} phone`)

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
                    duration={1000}
                    source={require("../../assets/logo.png")}
                    style={{ height: height * 0.3, width: height * 0.3 }}
                />

            </View>
            <Animatable.View
                duration={1000}

                animation="fadeInUpBig"
                style={styles.footer}
            >
                <SocialIcon
                    title='Sign In With Facebook'
                    button
                    type='facebook'
                    onPress={login}
                />
                <TouchableOpacity onPress={() => navigate("SignIn")} >
                    <Text style={styles.textStyle}>
                        Use your phone number instead
                    </Text>
                </TouchableOpacity>
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
        paddingHorizontal: 30,
        paddingVertical: 50,
    },
    textStyle: {
        color: "gray",
        paddingVertical: 10,
        textAlign: "center"
    },
})

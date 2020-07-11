import React, { useContext, useState, useEffect } from 'react'
import { StyleSheet, View, Button, Dimensions, StatusBar, Animated, Keyboard, KeyboardAvoidingView } from 'react-native'
import { Context as AuthContext } from "../context/AuthContext"
import { SocialIcon, Input, Icon, Text } from 'react-native-elements'
import * as Animatable from "react-native-animatable"

const SignIn = ({ navigation: { navigate } }) => {
    const { state, restoreToken } = useContext(AuthContext)

    const { height } = Dimensions.get("screen")

    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');

    const { signIn } = React.useContext(AuthContext);
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
                    duration={800}
                    source={require("../../assets/logo.png")}
                    style={{ height: height * 0.2, width: height * 0.2 }}
                />

            </View>
            <Animatable.View
                animation="fadeInUpBig"

                style={styles.footer}
                behavior="padding"
            >
                <Input
                    placeholder='Email'
                    value={username}
                    onChangeText={setUsername}
                    leftIcon={
                        <Icon
                            name='email'
                            type='fontisto'
                            size={20}
                            color='gray'
                        />
                    }
                />
                <Input
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                    placeholder='Password'
                    leftIcon={
                        <Icon
                            color='gray'
                            name='lock'
                            type="feather"
                            size={20}
                        />
                    }
                />
                <Button title="Sign in" onPress={() => signIn({ username, password })} />
                <Button title="Sign up" onPress={() => signIn({ username, password })} />
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
    footer: {
        flex: 2,
        backgroundColor: "#fff",
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 30,
        paddingVertical: 50,
    }
})

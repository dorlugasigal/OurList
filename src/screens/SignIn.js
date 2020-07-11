import React, { useContext } from 'react'
import { StyleSheet, TextInput, View, Button } from 'react-native'
import { Context as AuthContext } from "../context/AuthContext"


const SignIn = () => {
    const { state, restoreToken } = useContext(AuthContext)

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
        <View>
            <TextInput
                placeholder="Username"
                value={username}
                onChangeText={setUsername}
            />
            <TextInput
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <Button title="Sign in" onPress={() => signIn({ username, password })} />
        </View>
    );
}
export default SignIn

const styles = StyleSheet.create({})

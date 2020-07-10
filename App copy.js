import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, Alert, Image } from 'react-native';
import * as Facebook from 'expo-facebook';
import { FACEBOOK_APP_ID } from 'react-native-dotenv'

export default function App() {



  const [picture, setPicture] = useState(null)
  const [friends, setFriends] = useState([])
  async function login() {
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
      <Text>Open up App.js to start working on your app!</Text>
      <Button title="login" onPress={login}></Button>

      {picture &&
        <View>
          <Image style={styles.logo}
            source={{
              uri: picture,
            }} />
          <Text>{friends.data[0].name}</Text>
        </View>}

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 66,
    height: 58,
  },
});

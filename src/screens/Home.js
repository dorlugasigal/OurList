import React from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'
import { Context as AuthContext } from "../context/AuthContext"

const Home = () => {
    const { signOut } = React.useContext(AuthContext);

    return (
        <View>
            <Text>Home</Text>
            <Button onPress={signOut} title="Sign Out" />
        </View>
    )
}

export default Home

const styles = StyleSheet.create({})

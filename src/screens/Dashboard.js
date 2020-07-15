import React from 'react'
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native'
import { Context as AuthContext } from "../context/AuthContext"
import ActionButton from 'react-native-action-button';
import { MaterialIcons } from '@expo/vector-icons';
const Dashboard = () => {
    const { signOut } = React.useContext(AuthContext);

    return (
        <View style={styles.container}>
            <Text>Your Lists</Text>

            <Button onPress={signOut} title="Sign Out" />
            {/* <ActionButton buttonColor="rgba(231,76,60,1)">
                <ActionButton.Item
                    buttonColor="#9b59b6"
                    title="New List"
                    onPress={() => console.log('New List tapped!')}>
                </ActionButton.Item>
            </ActionButton> */}
            <TouchableOpacity onPress={() => alert('FAB clicked')} style={styles.fab}>
                <MaterialIcons name="playlist-add" size={24} color="black" />
            </TouchableOpacity>
        </View>
    )
}

export default Dashboard

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    fab: {
        position: 'absolute',
        width: 56,
        height: 56,
        alignItems: 'center',
        justifyContent: 'center',
        right: 20,
        bottom: 20,
        backgroundColor: 'rgb(160,126,177)',
        borderRadius: 30,
        elevation: 8
    },
    fabIcon: {
        fontSize: 40,
        color: 'white'
    }
})

import React, { useContext, useState } from 'react'
import { StyleSheet, View, Dimensions, StatusBar, Text } from 'react-native'
import { Context as AuthContext } from "../context/AuthContext"
import { Image, Input, Icon, Button } from 'react-native-elements'
import * as Animatable from "react-native-animatable"
import { LinearGradient } from 'expo-linear-gradient';

const SignIn = ({ navigation: { navigate } }) => {
    const { state, signIn } = useContext(AuthContext)
    const [phoneNumber, setPhoneNumber] = useState("")
    const { height } = Dimensions.get("screen")
    const isPhoneNumberValid = phoneNumber.length === 9

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
                    <Text style={styles.welcomeTextHeader}  >Login With Mobile Number</Text>
                    <Text style={styles.welcomeText} >We will send you one time password (OTP).</Text>
                </View>

            </View>
            <Animatable.View
                animation="fadeInUpBig"
                duration={600}
                style={styles.footer}
                behavior="padding"
            >
                <View style={styles.phoneInputContainer}>
                    <View style={styles.prefixContainer}>
                        <Text style={styles.prefix}>+972 (0)</Text>
                        <Image source={{ uri: "https://www.countryflags.io/il/shiny/64.png" }} style={{ width: 20, height: 20, alignContent: "center" }} />
                    </View>
                    <View style={styles.inputContainer}>
                        <Input
                            inputContainerStyle={styles.input}
                            inputStyle={{
                                paddingHorizontal: 10,
                                letterSpacing: 2,
                                fontSize: 20,
                            }}
                            placeholder="Mobile Number"
                            keyboardType="number-pad"
                            underlineColorAndroid="transparent"
                            value={phoneNumber}
                            onChangeText={setPhoneNumber}
                            maxLength={10}
                            rightIcon={

                                isPhoneNumberValid ? <Icon
                                    name='check'
                                    size={24}
                                    color='green'
                                /> : phoneNumber ? <Icon
                                    name='error'
                                    size={24}
                                    color='#d83253'
                                /> : null
                            }
                        />
                    </View>
                </View>

                <Button
                    title='Use your phone number instead'
                    disabled={!isPhoneNumberValid}
                    button
                    titleStyle={{ color: "#FFF" }}
                    buttonStyle={{ borderRadius: 1000, padding: 10 }}
                    onPress={() => navigate("SmsAuthentication", { phoneNumber: `+972${phoneNumber}` })}

                />
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
    input: {
        paddingHorizontal: 10,
    },
    footer: {
        flex: 1,
        backgroundColor: "#fff",
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 30,
        paddingVertical: 50,
        shadowColor: 'rgba(35,21,42,0.5)',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 1,
        shadowRadius: 1,

    },
    phoneInputContainer: {
        flex: 1,
        height: 70,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        padding: 5

    },
    inputContainer: {
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
        fontSize: 23,
        textAlign: "center"
    },
    welcomeText: {
        color: "#FFF",
        textAlign: "center"
    }
})

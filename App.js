import React, { useContext, useEffect, useState } from 'react';
import { AsyncStorage } from 'react-native';
import { ThemeProvider } from 'react-native-elements';

import Dashboard from "./src/screens/Dashboard"
import SignInScreen from "./src/screens/SignIn"
import GetStartedScreen from "./src/screens/GetStarted"
import SmsAuthenticationScreen from "./src/screens/SmsAuthentication"
import SplashScreen from "./src/screens/Splash"

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Context as AuthContext, Provider as AuthProvider } from "./src/context/AuthContext.js"
import * as Font from 'expo-font';

import {
  setCustomText,
} from 'react-native-global-props';

const Stack = createStackNavigator();

const App = ({ navigation }) => {
  const [ready, setReady] = useState(false)
  useEffect(() => {
    Font.loadAsync({
      'Montserrat': require('./assets/fonts/Montserrat-Medium.ttf')
    }).then(() => {
      setCustomText({
        style: {
          fontFamily: "Montserrat"
        }
      });
      setReady(true)
    })
  }, [])

  const { state, restoreToken } = useContext(AuthContext)

  React.useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let userToken;

      try {
        userToken = await AsyncStorage.getItem('userToken');
        console.log(userToken, "userToken")
      } catch (e) {
        console.log("didnt found", "userToken")
        // Restoring token failed
      }

      // After restoring token, we may need to validate it in production apps

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      await restoreToken(userToken)
    };

    bootstrapAsync();
  }, []);
  const stackOptions = {
    headerShown: false,
    title: 'Sign in',
    // When logging out, a pop animation feels intuitive
    animationTypeForReplace: state.isSignout ? 'pop' : 'push',
  }

  return (
    ready && <NavigationContainer>
      <Stack.Navigator>
        {state.isLoading ? (
          // We haven't finished checking for the token yet
          <Stack.Screen name="Splash" component={SplashScreen} />
        ) : state.userToken == null ? (
          // No token found, user isn't signed in
          <>
            <Stack.Screen
              name="GetStarted"
              component={GetStartedScreen}
              options={stackOptions}
            />
            <Stack.Screen
              name="SignIn"
              component={SignInScreen}
              options={stackOptions}
            />
            <Stack.Screen
              name="SmsAuthentication"
              component={SmsAuthenticationScreen}
              options={stackOptions}
            />

          </>
        ) : (
              // User is signed in
              <Stack.Screen name="Dashboard" component={Dashboard} />
            )}
      </Stack.Navigator>
    </NavigationContainer>)

}
export default () => {
  return (
    <AuthProvider>
      <ThemeProvider theme={{
        colors: {
          primary: 'rgb(160,126,177)',
        },

      }} >
        <App />
      </ThemeProvider  >
    </AuthProvider >
  )
}
import React, { useContext } from 'react';
import { AsyncStorage } from 'react-native';

import HomeScreen from "./src/screens/Home"
import SignInScreen from "./src/screens/SignIn"
import GetStartedScreen from "./src/screens/GetStarted"
import SmsAuthenticationScreen from "./src/screens/SmsAuthentication"
import SplashScreen from "./src/screens/Splash"

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Context as AuthContext, Provider as AuthProvider } from "./src/context/AuthContext.js"

const Stack = createStackNavigator();

const App = ({ navigation }) => {
  const { state, restoreToken } = useContext(AuthContext)

  console.log(restoreToken)

  React.useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let userToken;

      try {
        userToken = await AsyncStorage.getItem('userToken');
      } catch (e) {
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
    <NavigationContainer>
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
              <Stack.Screen name="Home" component={HomeScreen} />
            )}
      </Stack.Navigator>
    </NavigationContainer>)

}
export default () => {
  return (
    <AuthProvider>
      <App />
    </AuthProvider >
  )
}
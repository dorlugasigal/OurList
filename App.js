import * as React from 'react';
import { AsyncStorage, Button, Text, TextInput, View } from 'react-native';
import HomeScreen from "./src/screens/Home"
import SignInScreen from "./src/screens/SignIn"
import SplashScreen from "./src/screens/Splash"
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Context as AuthContext, Provider as AuthProvider } from "./src/context/AuthContext"

const Stack = createStackNavigator();

export default function App({ navigation }) {

  const { state, signIn, signOut, restoreToken } = useContext(AuthContext)

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
      dispatch({ type: 'RESTORE_TOKEN', token: userToken });
    };

    bootstrapAsync();
  }, []);


  return (
    <AuthProvider >
      <NavigationContainer>
        <Stack.Navigator>
          {state.isLoading ? (
            // We haven't finished checking for the token yet
            <Stack.Screen name="Splash" component={SplashScreen} />
          ) : state.userToken == null ? (
            // No token found, user isn't signed in
            <Stack.Screen
              name="SignIn"
              component={SignInScreen}
              options={{
                title: 'Sign in',
                // When logging out, a pop animation feels intuitive
                animationTypeForReplace: state.isSignout ? 'pop' : 'push',
              }}
            />
          ) : (
                // User is signed in
                <Stack.Screen name="Home" component={HomeScreen} />
              )}
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
}
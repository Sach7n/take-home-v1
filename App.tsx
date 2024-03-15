/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {AppProvider} from './context';

import Home from './screens/Home';
import Screen2 from './screens/Screen2';
import Faviroutes from './screens/Faviroutes';

function App(): React.JSX.Element {
  const Stack = createNativeStackNavigator();
  return (
    <AppProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Details" component={Screen2} />
          <Stack.Screen name="Favs" component={Faviroutes} />
        </Stack.Navigator>
      </NavigationContainer>
    </AppProvider>
  );
}

export default App;

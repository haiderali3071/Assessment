import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  FlatList
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();

import ViewAllBooks from './src/screens/ViewAllBooks';
import ViewBook from './src/screens/ViewBook';


const App = () => {



  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
        headerTitleStyle: {
          fontWeight: '700', fontSize: 18
        },
        headerTintColor: '#1D232B',
        headerTitleAlign: 'center'
      }} >
        <Stack.Screen
          name="ViewAllBooks"
          component={ViewAllBooks}
          options={{ title: '자유톡' }}
        />
        <Stack.Screen
          name="ViewBook"
          component={ViewBook}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
};

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1
  },
});

export default App;

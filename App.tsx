/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import React from 'react';
import {Easing} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import type {PropsWithChildren} from 'react';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import themeReducer from './stores/themeReducer';
import {MainLayout, CourseListing, CourseDetails} from './screens';
import {createSharedElementStackNavigator} from 'react-navigation-shared-element';
import {CardStyleInterpolators} from '@react-navigation/stack';

const Stack = createSharedElementStackNavigator();
const options = {
  gestureEnabled: false,
  transitionSpec: {
    open: {
      animation: 'timing',
      config: {duration: 400, easing: Easing.inOut(Easing.ease)},
    },
    close: {
      animation: 'timing',
      config: {duration: 400, easing: Easing.inOut(Easing.ease)},
    },
  },
  cardStyleInterpolator: ({current: {progress}}) => {
    return {
      cardStyle: {
        opacity: progress,
      },
    };
  },
};
const store = createStore(themeReducer, applyMiddleware(thunk));

function App(): JSX.Element {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            useNativeDriver: true,
            headerShown: false,
          }}
          initialRouteName={'Dashboard'}
          detachInactiveScreens={false}>
          <Stack.Screen name="Dashboard" component={MainLayout} />

          <Stack.Screen
            name="CourseListing"
            component={CourseListing}
            options={() => options}
          />

          <Stack.Screen name="CourseDetails" component={CourseDetails} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;

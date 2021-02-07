import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import {
  createDrawerNavigator,
  DrawerItemList,
} from '@react-navigation/drawer';
import { Platform, SafeAreaView, Button, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';

import HomeScreen, {
  screenOptions as homeScreenOptions,
} from '../screens/HomeScreen';
import Screen1, { screenOptions as screen1Options } from '../screens/Screen1';
import Screen2, { screenOptions as screen2Options } from '../screens/Screen2';
import Screen3 from '../screens/Screen3';
import AuthScreen from '../screens/AuthScreen';
import * as authActions from '../store/actions/auth';
import Colors from '../constants/Colors';

const defaultNavOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === 'android' ? Colors.primary : '',
  },
  headerTitleStyle: {
    fontFamily: 'SemiBold',
  },
  headerBackTitleStyle: {
    fontFamily: 'Regular',
  },
  headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary,
};

const headerStyle = {
  headerStyle: {
    backgroundColor: '#3f51b5',
  },
  headerTintColor: '#fff',
  headerTitleStyle: {
    paddingLeft: 'auto',
    fontWeight: 'bold',
  },
};

const SaloonStackNavigator = createStackNavigator();

const SaloonNavigator = () => (
  <SaloonStackNavigator.Navigator screenOptions={defaultNavOptions}>
    <SaloonStackNavigator.Screen
      name="Home"
      component={HomeScreen}
      options={homeScreenOptions}
    />
    <SaloonStackNavigator.Screen
      name="Screen 3"
      component={Screen3}
      options={headerStyle}
    />
  </SaloonStackNavigator.Navigator>
);

const Navigator1 = () => (
  <SaloonStackNavigator.Navigator screenOptions={defaultNavOptions}>
    <SaloonStackNavigator.Screen
      name="Screen 1"
      component={Screen1}
      options={screen1Options}
    />
  </SaloonStackNavigator.Navigator>
);

const Navigator2 = () => (
  <SaloonStackNavigator.Navigator screenOptions={defaultNavOptions}>
    <SaloonStackNavigator.Screen
      name="Screen 2"
      component={Screen2}
      options={screen2Options}
    />
  </SaloonStackNavigator.Navigator>
);

const AuthStackNavigator = createStackNavigator();

export const AuthNavigator = () => (
  <AuthStackNavigator.Navigator screenOptions={defaultNavOptions}>
    <AuthStackNavigator.Screen
      name="Authentication"
      component={AuthScreen}
      options={headerStyle}
    />
  </AuthStackNavigator.Navigator>
);

const SaloonDrawerNavigator = createDrawerNavigator();

export const MainNavigator = () => {
  const dispatch = useDispatch();

  return (
    <SaloonDrawerNavigator.Navigator
      drawerContent={props => (
        <View style={{ flex: 1, paddingTop: 20 }}>
          <SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }}>
            <DrawerItemList {...props} />
            <Button
              title="Logout"
              color={Colors.primary}
              onPress={() => {
                dispatch(authActions.logout());
              }}
            />
          </SafeAreaView>
        </View>
      )}
      drawerContentOptions={{
        activeTintColor: Colors.primary,
      }}
    >
      <SaloonDrawerNavigator.Screen
        name="Home"
        component={SaloonNavigator}
        options={{
          drawerIcon: props => (
            <Ionicons
              name={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
              size={23}
              // eslint-disable-next-line react/prop-types
              color={props.color}
            />
          ),
        }}
      />
      <SaloonDrawerNavigator.Screen
        name="Screen 1"
        component={Navigator1}
        options={{
          drawerIcon: props => (
            <Ionicons
              name={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
              size={23}
              // eslint-disable-next-line react/prop-types
              color={props.color}
            />
          ),
        }}
      />
      <SaloonDrawerNavigator.Screen
        name="Screen 2"
        component={Navigator2}
        options={{
          drawerIcon: props => (
            <Ionicons
              name={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
              size={23}
              // eslint-disable-next-line react/prop-types
              color={props.color}
            />
          ),
        }}
      />
    </SaloonDrawerNavigator.Navigator>
  );
};

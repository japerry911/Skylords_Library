import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import WelcomeScreen from './src/screens/WelcomeScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import SignInScreen from './src/screens/SignInScreen';
import GetStartedScreen from './src/screens/GetStartedScreen';
import LearnMoreScreen from './src/screens/LearnMoreScreen';
import HomeScreen from './src/screens/HomeScreen';
import BooksScreen from './src/screens/BooksScreen';
import ShowBookScreen from './src/screens/ShowBookScreen';
import AddReviewScreen from './src/screens/AddReviewScreen';
import React from 'react';
  
  const CustomDrawerContent = props => {
    return (
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
        <DrawerItem label='Sign Out' onPress={() => props.navigation.navigate('Welcome', 'Sign In')} />
      </DrawerContentScrollView>
    );
  };
  
  const Stack = createStackNavigator();
  const Drawer = createDrawerNavigator();
  
  export const WelcomeStack = () => {
    return (
      <Drawer.Navigator>
        <Drawer.Screen name='Welcome' component={WelcomeScreen} />
        <Drawer.Screen name='Get Started' component={GetStartedScreen} />
        <Drawer.Screen name='Learn More' component={LearnMoreScreen} />
        <Drawer.Screen name='Sign Up' component={SignUpScreen} />
        <Drawer.Screen name='Sign In' component={SignInScreen} />
      </Drawer.Navigator>
    );
  };
  
  export const AuthStack = () => {
    return (
      <Drawer.Navigator initialRouteName='Home' drawerContent={props => <CustomDrawerContent {...props} />}>
        <Drawer.Screen name='Home' component={HomeScreen} />
        <Drawer.Screen name='Books' component={BooksStack} />
        <Drawer.Screen name='Add a Review' component={AddReviewScreen} />
      </Drawer.Navigator>
    );
  };
  
  export const BooksStack = () => {
    return (
      <Stack.Navigator initialRouteName='Books' headerMode='none'>
        <Stack.Screen name='Books' component={BooksScreen} />
        <Stack.Screen name='ShowBook' component={ShowBookScreen} />
      </Stack.Navigator> 
    );
  };
  
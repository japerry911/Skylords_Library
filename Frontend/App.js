import React, { useState } from 'react';
import { AppLoading } from 'expo';
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer, DrawerActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'
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
import Colors from './src/constants/colors';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Root } from 'native-base';
import { userContext } from './src/contexts/userContext';

const foundationHeaderOptions = {
  headerStyle: { backgroundColor: Colors.primaryOrange },
  headerTitleStyle: { color: 'white' },
  headerLeft: () => <MaterialCommunityIcons
                      name='paw'
                      size={40}
                      style={styles.headerLeftIconStyle}
                    />
};

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

const WelcomeStack = () => {
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

const AuthStack = () => {
  return (
    <Drawer.Navigator initialRouteName='Home' drawerContent={props => <CustomDrawerContent {...props} />}>
      <Drawer.Screen name='Home' component={HomeScreen} />
      <Drawer.Screen name='Books' component={BooksStack} />
      <Drawer.Screen name='Add a Review' component={AddReviewScreen} />
    </Drawer.Navigator>
  );
};

const BooksStack = () => {
  return (
    <Stack.Navigator initialRouteName='Books' headerMode='none'>
      <Stack.Screen name='Books' component={BooksScreen} />
      <Stack.Screen name='ShowBook' component={ShowBookScreen} />
    </Stack.Navigator> 
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Welcome'>
        <Stack.Screen 
          name='Welcome' 
          component={WelcomeStack} 
          options={({ navigation }) => ({ title: 'Skylord\'s Library', ...foundationHeaderOptions, headerRight: () => 
            <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
              <MaterialCommunityIcons 
                name='menu'
                size={35}
                style={{ backgroundColor: Colors.primaryOrange, color: Colors.accentLightWhite }}
              />
            </TouchableOpacity> })}
        />
        <Stack.Screen 
          name='Authed' 
          component={AuthStack} 
          options={({ navigation }) => ({ title: 'Skylord\'s Library', ...foundationHeaderOptions, headerRight: () => 
            <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
              <MaterialCommunityIcons 
                name='menu'
                size={35}
                style={{ backgroundColor: Colors.primaryOrange, color: Colors.accentLightWhite }}
              />
            </TouchableOpacity> })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const fetchFonts = () => {
  return Font.loadAsync({
    Roboto: require('native-base/Fonts/Roboto.ttf'),
    Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
    Avenir_next: require('./assets/fonts/AvenirNextLTPro-Regular.otf'),
    Avenir_italicize: require('./assets/fonts/AvenirNextLTPro-It.otf'),
    Avenir_bold: require('./assets/fonts/AvenirNextLTPro-Bold.otf'),
    Avenir_medium: require('./assets/fonts/Avenir-Medium.otf'),
    ...Ionicons.font
  });
};

const fetchImages = async() => {
  const images = [
    require('./assets/Library.png'),
    require('./assets/GetStartedImage.jpeg'),
    require('./assets/DogBookPets.jpg')
  ];

  const cacheImages = images.map(image => {
    return Asset.fromModule(image).downloadAsync();
  });

  return Promise.all(cacheImages);
};

export default () => {
  const [isLoading, setIsLoading] = useState(false);

  const _preloadsAsync = async () => {
    const fontAssets = fetchFonts();
    const imageAssets = fetchImages();

    await Promise.all([imageAssets, fontAssets]);
  };

  if (!isLoading) {
    return (
      <AppLoading 
        startAsync={_preloadsAsync}
        onFinish={() => setIsLoading(true)}
        onError={error => console.log(error)}
      />
    );
  }

  return (
    <Root>
      <userContext.Provider value={{user: {}}}>
      <App />
      </userContext.Provider>
    </Root>
  );
}

const styles = StyleSheet.create({
  headerLeftIconStyle: {
    color: 'white',
    marginLeft: 10
  },
  headerRightIconStyle: {
    color: 'white',
    marginRight: 10
  }
})
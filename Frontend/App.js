import React, { useState } from 'react';
import { AppLoading } from 'expo';
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer'
import WelcomeScreen from './src/screens/WelcomeScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import SignInScreen from './src/screens/SignInScreen';
import GetStartedScreen from './src/screens/GetStartedScreen';
import LearnMoreScreen from './src/screens/LearnMoreScreen';
import HomeScreen from './src/screens/HomeScreen';
import Colors from './src/constants/colors';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Root } from 'native-base';

const foundationHeaderOptions = {
  headerStyle: { backgroundColor: Colors.primaryOrange },
  headerTitleStyle: { color: 'white' },
  headerLeft: () => <MaterialCommunityIcons
                      name='paw'
                      size={40}
                      style={styles.headerLeftIconStyle}
                    />
};

const WelcomeStack = createStackNavigator(
  { Welcome: WelcomeScreen },
  {
    defaultNavigationOptions: () => ({
      title: 'Skylord\'s Library',
      ...foundationHeaderOptions
    })
  }
);

const GetStartedStack = createStackNavigator(
  { GetStarted: GetStartedScreen },
  {
    defaultNavigationOptions: () => ({
      title: 'Getting Started',
      ...foundationHeaderOptions
    })
  }
);

const LearnMoreStack = createStackNavigator(
  { LearnMore: LearnMoreScreen },
  {
    defaultNavigationOptions: () => ({
      title: 'Learn More',
      ...foundationHeaderOptions
    })
  }
);

const SignUpStack = createStackNavigator(
  { SignUp: SignUpScreen },
  {
    defaultNavigationOptions: () => ({
      title: 'Sign Up',
      ...foundationHeaderOptions
    })
  }
);

const SignInStack = createStackNavigator(
  { SignIn: SignInScreen },
  {
    defaultNavigationOptions: () => ({
      title: 'Sign In',
      ...foundationHeaderOptions
    })
  }
);

const HomeStack = createStackNavigator(
  { Home: HomeScreen },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      title: 'Home',
      headerRight: () =>  <TouchableOpacity onPress={() => navigation.openDrawer()}>
                                          <MaterialCommunityIcons
                                              name='menu'
                                              size={40}
                                              style={styles.headerRightIconStyle}
                                          />
                                        </TouchableOpacity>,
      ...foundationHeaderOptions
    })
  }
)

const DrawerNavigator = createDrawerNavigator({
  'Welcome': WelcomeStack,
  'Get Started': GetStartedStack,
  'Learn More': LearnMoreStack,
  'Sign Up': SignUpStack,
  'Sign In': SignInStack,
  'Home': HomeStack
})

const App = createAppContainer(DrawerNavigator);

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
      <App />
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
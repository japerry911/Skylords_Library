import React, { useState } from 'react';
import { AppLoading } from 'expo';
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import WelcomeScreen from './src/screens/WelcomeScreen';
import Colors from './src/constants/colors';
import { MaterialCommunityIcons, Entypo } from '@expo/vector-icons';
import { StyleSheet } from 'react-native';

const navigator = createStackNavigator({
  Welcome: WelcomeScreen
}, {
  initialRouteName: 'Welcome',
  defaultNavigationOptions: () => ({
    headerLeft: () => <MaterialCommunityIcons 
                    name='dog'
                    size={40} 
                    style={styles.headerLeftIconStyle}
                />,
    headerRight: () => <Entypo
                    name='open-book'
                    size={40}
                    style={styles.headerRightIconStyle}
                  />,
    headerTitleStyle: { color: 'white' },
    headerStyle: { backgroundColor: Colors.primary },
    title: 'Skylord\'s Library'
  })
    /*
    
  }*/
});

const App = createAppContainer(navigator);

const fetchFonts = () => {
  return Font.loadAsync({
    Roboto: require('native-base/Fonts/Roboto.ttf'),
    Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
    ...Ionicons.font
  });
};

const fetchImages = async() => {
  const images = [
    require('./assets/LibraryWelcomeBackground.jpg'),
    require('./assets/DogBooksWelcome.jpg')
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
    <App />
  );
}

const styles = StyleSheet.create({
  headerLeftIconStyle: {
    marginLeft: 70,
  },
  headerRightIconStyle: {
    marginRight: 70,
  }
})
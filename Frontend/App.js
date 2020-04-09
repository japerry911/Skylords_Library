import React, { useState } from 'react';
import { AppLoading } from 'expo';
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { Root } from 'native-base';
import { MainNavigator } from './navigation';
import { Provider as UserProvider } from './src/contexts/userContext';

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

const initialState = {
  user: {}
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
      <UserProvider>
        <MainNavigator />
      </UserProvider>
    </Root>
  );
}
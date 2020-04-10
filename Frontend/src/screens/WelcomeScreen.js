import React from 'react';
import { StyleSheet, ImageBackground, TouchableOpacity, View } from 'react-native';
import { Text, Body, Footer } from 'native-base';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Colors from '../constants/colors';
import FooterButton from '../components/FooterButton';

const WelcomeScreen = ({ navigation }) => {
    return (
        <ImageBackground 
            style={styles.backgroundImageStyle}
            source={require('../../assets/Library.png')}
            resizeMode='stretch'
        >
            <View style={styles.childComponents}>
                <View style={styles.bodyViewStyle}>
                    <Text style={styles.titleStyle}>
                        Skylord's{'\n\t\t\t'}Library
                        <MaterialCommunityIcons
                            name='paw'
                            size={20}
                            color={Colors.primaryOrange}
                        />
                    </Text>
                    <Text style={styles.subtitleStyle}>
                        Discover your favorite books with your favorite people<Text style={styles.highlightStyle}>.</Text>
                    </Text>
                </View>
                <FooterButton parentNavigation={navigation} />
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    childComponents: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
    pawImageStyle: {
        height: 10,
        width: 10,
    },
    highlightStyle: {
        fontSize: 20,
        fontFamily: 'Avenir_bold',
        color: Colors.primaryOrange
    },
    subtitleStyle: {
        color: 'white',
        fontSize: 20,
        fontFamily: 'Avenir_bold',
        textAlign: 'center'
    },
    bodyViewStyle: {   
        alignItems: 'center',
        justifyContent: 'center',
        height: '90%'
    },
    backgroundImageStyle: {
        flex: 1
    },
    titleStyle: {
        color: 'white',
        fontFamily: 'Avenir_bold',
        fontSize: 45
    }
});

export default WelcomeScreen;
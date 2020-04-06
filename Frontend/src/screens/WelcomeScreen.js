import React from 'react';
import { StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import { Text, View, Body, Footer } from 'native-base';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Colors from '../constants/colors';

const WelcomeScreen = ({ navigation }) => {
    return (
        <ImageBackground 
            style={styles.backgroundImageStyle}
            source={require('../../assets/Library.png')}
            resizeMode='stretch'
        >
            <View style={styles.childComponents}>
                <Body style={styles.bodyStyle}>
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
                </Body>
                <TouchableOpacity onPress={() => navigation.navigate('GetStarted')}>
                <Footer 
                    style={styles.footerStyle}
                >
                    <Text style={styles.footerTextStyle}>Get Started</Text>
                </Footer>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    footerTextStyle: {
        color: 'white',
        fontSize: 30,
        fontFamily: 'Avenir_bold',
        marginTop: 10
    },
    footerStyle: {
        backgroundColor: Colors.primaryOrange,
        alignItems: 'center',
        justifyContent: 'center'
    },
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
    bodyStyle: {   
        alignItems: 'center',
        justifyContent: 'center',
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
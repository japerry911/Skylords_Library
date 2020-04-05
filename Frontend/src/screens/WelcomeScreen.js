import React from 'react';
import { StyleSheet, Image, ImageBackground } from 'react-native';
import { Body, Container, H1, Text, Button } from 'native-base';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const WelcomeScreen = ({ navigation }) => {
    return (
        <ImageBackground
            style={styles.backgroundImageStyle}
            source={require('../../assets/LibraryWelcomeBackground.jpg')}
            resizeMode='cover'
        >
                <Body style={styles.bodyContainerStyle}>
                    <Container style={styles.titleContainerStyle}>
                        <H1 style={styles.textTitleStyle}>
                            Welcome to Skylord's Library!
                        </H1>
                    </Container>
                    <Container style={styles.descriptionContainerStyle}>
                        <Text style={styles.textStyle}>
                            Sky's Library is every book reader's dream! Sky's Library will help guide you to your 
                            next book with ease through our community-driven reviews. Many of the finest book readers 
                            on this planet rely on Sky's Library for their book needs. Let us help you find the right book
                            for <Text style={styles.highlightStyle}>YOU</Text>!
                        </Text>
                    </Container>
                    <Container style={styles.imageContainerStyle}>
                        <Image
                            style={styles.mainImageStyle}
                            source={require('../../assets/DogBooksWelcome.jpg')}
                        />
                    </Container>
                    <Container style={styles.enterContainerStyle}>
                        <Button 
                            style={styles.enterButtonStyle}
                            onPress={() => navigation.navigate('SignIn')}
                        >
                            <MaterialCommunityIcons
                                name='dog-side'
                                size={25}
                            />
                            <Text>Enter Sky's Library</Text>
                        </Button>
                        <Button style={styles.enterButtonStyle} onPress={() => navigation.navigate('SignUp')}>
                            <Text>Sign up</Text>
                        </Button>
                    </Container>
                </Body> 
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    titleContainerStyle: {
        borderColor: 'white',
        backgroundColor: '#86592d',
        flex: 1,
        maxHeight: '10%',
        maxWidth: '90%',
        marginVertical: 30,
        alignItems: 'center',
        padding: 10,
        justifyContent: 'center',
        borderRadius: 20,
        borderWidth: 3,
        shadowOffset: {
            height: 10,
            width: 10
        },
        shadowOpacity: .75
    },
    highlightStyle: {
        color: 'pink'
    },
    descriptionContainerStyle: {
        borderColor: 'white',
        backgroundColor: '#86592d',
        flex: 1,
        maxHeight: '22%',
        maxWidth: '80%',
        marginVertical: 30,
        alignItems: 'center',
        padding: 10,
        justifyContent: 'center',
        borderRadius: 20,
        borderWidth: 3,
        shadowOffset: {
            height: 10,
            width: 10
        },
        shadowOpacity: .75
    },
    textTitleStyle: {
        fontSize: 16,
        color: 'white'
    }, 
    textStyle: {
        color: 'white'
    },
    backgroundImageStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    mainContainerStyle: { 
        alignItems: 'center', 
        justifyContent: 'center'
    },
    bodyContainerStyle: {
        justifyContent: 'space-evenly',
        alignItems: 'center',
        backgroundColor: '#cc9966',
        maxHeight: '70%',
        padding: 15
    },
    imageContainerStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100,
        maxHeight: '20%',
        overflow: 'hidden',
        marginVertical: 30,
        borderWidth: 3,
        borderColor: 'white'
    },
    enterContainerStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        maxHeight: '10%',
        marginBottom: 40,
        backgroundColor: 'transparent',
        shadowOffset: {
            height: 10,
            width: 10
        },
        shadowOpacity: .75
    },
    enterButtonStyle: {
        borderWidth: 3,
        borderColor: 'white',
    }
});

export default WelcomeScreen;
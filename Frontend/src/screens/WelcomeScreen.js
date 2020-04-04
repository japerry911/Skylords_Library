import React from 'react';
import { StyleSheet, Image, ImageBackground } from 'react-native';
import { Body, Container, H1, Text, Button } from 'native-base';

const WelcomeScreen = () => {
    return (
        <ImageBackground
            style={styles.backgroundImageStyle}
            source={require('../../assets/LibraryWelcomeBackground.jpg')}
            resizeMode='cover'
        >
                <Body style={styles.bodyContainerStyle}>
                    <Container style={styles.titleContainerStyle}>
                        <H1 style={styles.titleStyle}>
                            Welcome to Skylord's Library!
                        </H1>
                    </Container>
                    <Container style={styles.imageContainerStyle}>
                        <Image
                            style={styles.mainImageStyle}
                            source={require('../../assets/DogBooksWelcome.jpg')}
                        />
                    </Container>
                    <Container style={styles.enterContainerStyle}>
                        <Button style={styles.enterButtonStyle}>
                            <Text>Enter Sky's Library</Text>
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
    titleStyle: {
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
        alignItems: 'center'
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
        maxHeight: '5%',
        marginBottom: 40,
    },
    enterButtonStyle: {
        borderWidth: 3,
        borderColor: 'white'
    }
});

export default WelcomeScreen;
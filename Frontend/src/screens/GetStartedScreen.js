import React from 'react';
import { StyleSheet, Image, View, TouchableOpacity } from 'react-native';
import { Container, Text, Button, Footer, Body } from 'native-base';
import Colors from '../constants/colors';

const GetStartedScreen = ({ navigation}) => {
    return (
        <Container style={styles.containerScreenStyle}>
            <Body style={styles.bodyStyle}>
                <View style={styles.imageViewStyle}>
                    <Image 
                        source={require('../../assets/GetStartedImage.jpeg')}
                    />
                    <Text
                        style={styles.textBoldStyle}
                    >
                        A destination for book and pet lovers<Text style={styles.highlightStyle}>.</Text>
                    </Text>
                    <Text
                        style={styles.textRegStyle}
                    >
                        Connect with our community to discover the perfect book<Text style={styles.highlightStyle}>.</Text>
                    </Text>
                </View>
                <Button 
                    style={styles.signUpButtonStyle}
                    onPress={() => navigation.navigate('Sign Up')}
                >
                    <View style={styles.test}>
                    <Text style={styles.buttonTextStyle}>Sign Up</Text>
                    </View>
                </Button>
                <Button 
                    style={styles.signInButtonStyle}
                    onPress={() => navigation.navigate('Sign In')}
                >
                    <Text style={styles.buttonTextStyle}>Sign In</Text>
                </Button>
            </Body>
            <TouchableOpacity 
                style={styles.footerStyle}
                onPress={() => navigation.navigate('Learn More')}
            >
                <Footer
                    style={styles.footerStyle}
                >
                    <Text style={styles.footerTextStyle}>
                        Learn More
                    </Text>
                </Footer>
            </TouchableOpacity>
        </Container>
    );
};

const styles = StyleSheet.create({
    bodyStyle: {
        width: '100%'
    },
    footerTextStyle: {
        color: 'white',
        fontSize: 30,
        fontFamily: 'Avenir_bold',
        marginTop: 15
    },
    footerStyle: {
        backgroundColor: Colors.primaryOrange,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    signInButtonStyle: {
        backgroundColor: Colors.accentLightOrange,
        width: '40%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    signUpButtonStyle: {
        backgroundColor: Colors.primaryOrange,
        marginVertical: 15,
        width: '50%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonTextStyle: {
        fontFamily: 'Avenir_bold',
        fontSize: 24,
        paddingTop: 5,
        textAlign: 'center'
    },
    textBoldStyle: {
        fontFamily: 'Avenir_bold', 
        fontSize: 16,
        marginVertical: 10,
        color: Colors.accentLightGrayText
    }, 
    textRegStyle: {
        fontFamily: 'Avenir_next',
        textAlign: 'center',
        color: Colors.accentLightGrayText,
        fontSize: 18,
        marginBottom: 10
    },
    imageViewStyle: {
        backgroundColor: Colors.accentLightWhite,
        justifyContent: 'center',
        alignItems: 'center',
        maxWidth: '90%',
        overflow: 'hidden',
        marginTop: 20,
        borderRadius: 10
    },
    highlightStyle: {
        color: Colors.primaryOrange,
        fontSize: 20
    },
    containerScreenStyle: {
        backgroundColor: Colors.accentLightGray,
        flex: 1,
        alignItems: 'center'
    }
});

export default GetStartedScreen;
import React from 'react';
import { StyleSheet, Image, View, Text } from 'react-native';
import { Button } from 'native-base';
import Colors from '../constants/colors';
import FooterButton from '../components/FooterButton';

const GetStartedScreen = ({ navigation }) => {
    return (
        <View style={styles.viewScreenStyle}>
            <View style={styles.bodyViewStyle}>
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
                    <Text style={styles.buttonTextStyle}>Sign Up</Text>
                </Button>
                <Button 
                    style={styles.signInButtonStyle}
                    onPress={() => navigation.navigate('Sign In')}
                >
                    <Text style={styles.buttonTextStyle}>Sign In</Text>
                </Button>
            </View>
            <FooterButton 
                destination='Learn More'
                parentNavigation={navigation}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    bodyViewStyle: {   
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
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
        textAlign: 'center',
        color: Colors.accentLightWhite
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
    viewScreenStyle: {
        backgroundColor: Colors.accentLightGray,
        flex: 1
    }
});

export default GetStartedScreen;
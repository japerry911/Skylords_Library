import React from 'react';
import { StyleSheet, ImageBackground, View, TouchableOpacity } from 'react-native';
import { Text, Body, Form, Label, Input, Item, Button } from 'native-base';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Colors from '../constants/colors';

const SignInScreen = ({ navigation }) => {
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
                        A destination for book and pet lovers<Text style={styles.highlightStyle}>.</Text>
                    </Text>
                    <View style={styles.formViewStyle}>
                        <Form>
                            <Item
                                floatingLabel
                                style={styles.formItemStyle}
                            >
                                <Label style={styles.formItemLabelStyle}>Enter your Username</Label>
                                <Input />
                            </Item>
                            <Item 
                                floatingLabel
                                style={styles.formItemStyle}
                            >
                                <Label style={styles.formItemLabelStyle}>Enter your Password</Label>
                                <Input />
                            </Item>
                            <Button
                                style={styles.loginButtonStyle}
                            >
                                <Text style={styles.buttonText}>Login</Text>    
                            </Button>
                        </Form>
                        <Text style={styles.signUpTextStyle}>
                            Don't have an account?&nbsp;
                            <Text 
                                style={styles.signUpText}
                                onPress={() => navigation.navigate('SignUp')}
                            >
                                Sign Up.</Text>
                        </Text>
                    </View>
                </Body>
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    signUpTextStyle: {
        color: Colors.accentLightGrayText,
        fontFamily: 'Avenir_italicize',
        fontSize: 18,
        marginVertical: 10
    },
    signUpText: {
        color: Colors.primaryOrange,
        fontFamily: 'Avenir_bold',
        fontSize: 18
    },
    backgroundImageStyle: {
        flex: 1
    },
    childComponents: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
    bodyStyle: {   
        alignItems: 'center'
    },
    titleStyle: {
        marginTop: '10%',
        color: 'white',
        fontFamily: 'Avenir_bold',
        fontSize: 35
    },
    subtitleStyle: {
        color: 'white',
        fontSize: 16,
        fontFamily: 'Avenir_bold',
        textAlign: 'center',
        marginHorizontal: '10%'
    },
    highlightStyle: {
        fontSize: 20,
        fontFamily: 'Avenir_bold',
        color: Colors.primaryOrange
    },
    formViewStyle: {
        borderRadius: 15,
        minWidth: '90%',
        backgroundColor: Colors.accentLightWhite,
        marginTop: 30,
        alignItems: 'center',
        minHeight: '40%'
    },
    formItemStyle: {
        width: '80%'
    },
    formItemLabelStyle: {
        color: Colors.accentLightGrayText
    },
    loginButtonStyle: {
        backgroundColor: Colors.primaryOrange,
        marginVertical: 15,
        justifyContent: 'center',
        alignItems: 'center',
        minWidth: '50%',
        alignSelf: 'center'
    },
    buttonText: {
        fontSize: 24,
        fontFamily: 'Avenir_bold',
        paddingTop: 5
    }
});

export default SignInScreen;
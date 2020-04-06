import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Container, Body, Text, Form, Label, Item, Input, Button } from 'native-base';
import Colors from '../constants/colors';

const SignUpScreen = () => {
    return (
        <Container style={styles.mainContainerStyle}>
            <Body>
                <Text 
                    style={styles.mainHeaderStyle}
                >
                    Welcome to Skylord's Library
                </Text>
                <Text 
                    style={styles.subtitleHeaderStyle}
                >
                    Please Sign Up to continue
                </Text>
                <View style={styles.formViewStyle}>
                    <Form>
                        <Item 
                            floatingLabel
                            style={styles.formItemStyle}
                        >
                            <Label style={styles.roundedLabelStyle}>Enter your Username</Label>
                            <Input />
                        </Item>
                        <Item 
                            floatingLabel
                            style={styles.formItemStyle}
                        >
                            <Label style={styles.roundedLabelStyle}>Enter your Age</Label>
                            <Input />
                        </Item>
                        <Item 
                            floatingLabel
                            style={styles.formItemStyle}
                        >
                            <Label style={styles.roundedLabelStyle}>Enter your Password</Label>
                            <Input />
                        </Item>
                        <Item 
                            floatingLabel                            
                            style={styles.formItemStyle}
                        >
                            <Label style={styles.roundedLabelStyle}>Confirm your Password</Label>
                            <Input />
                        </Item>
                    </Form>
                    <Button style={styles.signUpButtonStyle}>
                        <Text style={styles.buttonTextStyle}>Sign Up</Text>
                    </Button>
                    <Button style={styles.goBackButtonStyle}>
                        <Text style={styles.buttonTextStyle}>Go Back</Text>
                    </Button>
                </View>
            </Body>
        </Container>
    );
};

const styles = StyleSheet.create({
    formItemLabelStyle: {
        color: Colors.accentLightGrayText,
        fontFamily: 'Avenir_bold',
        marginTop: 10
    },
    roundedLabelStyle: {
        color: Colors.accentLightGrayText
    },
    buttonTextStyle: {
        fontSize: 24,
        fontFamily: 'Avenir_bold',
        paddingTop: 5
    },
    formItemStyle: {
        width: '80%'
    },
    signUpButtonStyle: {
        backgroundColor: Colors.primaryOrange,
        marginVertical: 15,
        paddingHorizontal: 25
    },
    goBackButtonStyle: {
        backgroundColor: Colors.accentLightOrange,
        marginBottom: 25,
        paddingHorizontal: 5
    },
    formViewStyle: {
        borderRadius: 15,
        minWidth: '90%',
        backgroundColor: Colors.accentLightWhite,
        marginTop: 30,
        alignItems: 'center'
    },
    mainHeaderStyle: {
        fontSize: 20,
        fontFamily: 'Avenir_bold',
        marginTop: 40,
        color: Colors.accentLightGrayText   
    },
    subtitleHeaderStyle: {
        marginTop: 10,
        color: Colors.accentLightGrayText,
        fontSize: 18,
        fontFamily: 'Avenir_next'
    },
    mainContainerStyle: {
        backgroundColor: Colors.accentLightGray
    }
});

export default SignUpScreen;
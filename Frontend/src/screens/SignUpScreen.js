import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { Container, Body, Text, Form, Label, Item, Input, Button, Icon } from 'native-base';
import Colors from '../constants/colors';

const onFormSubmit = (username, age, password, callBack) => {};

const SignUpScreen = () => {
    const [username, setUsername] = useState('');
    const [age, setAge] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordMatchingBool, setPasswordMatchingBool] = useState(false);
    const [validationStatus, setValidationStatus] = useState(false);

    useEffect(() => {
        setPasswordMatchingBool(!(password !== confirmPassword || password === '' || confirmPassword === ''));
        if (username !== '' && age !== '' && !(password !== confirmPassword || password === '' || confirmPassword === '')) {
            setValidationStatus(true);
        } else {
            setValidationStatus(false);
        }
    }, [password, confirmPassword, username, age]);

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
                            <Input
                                value={username}
                                onChangeText={newUsername => setUsername(newUsername)}
                            />
                        </Item>
                        <Item 
                            floatingLabel
                            style={styles.formItemStyle}
                        >
                            <Label style={styles.roundedLabelStyle}>Enter your Age</Label>
                            <Input
                                value={age}
                                onChangeText={newAge => setAge(newAge.replace(/[^0-9]/g, ''))}
                                keyboardType='numeric'
                                maxLength={3}
                            />
                        </Item>
                        <Item 
                            floatingLabel
                            style={styles.formItemStyle}
                            success={passwordMatchingBool}
                            error={!passwordMatchingBool}
                        >
                            <Label style={styles.roundedLabelStyle}>Enter your Password</Label>
                            <Input
                                value={password}
                                onChangeText={newPassword => setPassword(newPassword)}
                                secureTextEntry
                                autoCapitalize='none'
                                autoCorrect={false}
                            />
                            <Icon name={passwordMatchingBool ? 'checkmark-circle' : 'close-circle'} />
                        </Item>
                        <Item 
                            floatingLabel                            
                            style={styles.formItemStyle}
                            success={passwordMatchingBool}
                            error={!passwordMatchingBool}
                        >
                            <Label style={styles.roundedLabelStyle}>Confirm your Password</Label>
                            <Input 
                                value={confirmPassword}
                                onChangeText={newConfirmPassword => setConfirmPassword(newConfirmPassword)}
                                secureTextEntry
                                autoCapitalize='none'
                                autoCorrect={false}
                            />
                            <Icon name={passwordMatchingBool ? 'checkmark-circle' : 'close-circle'} />
                        </Item>
                    </Form>
                    <Button 
                        style={styles.signUpButtonStyle}
                        disabled={!validationStatus}
                    >
                        <Text style={styles.buttonTextStyle}>Sign Up</Text>
                        <Icon name={validationStatus ? 'checkmark-circle' : 'close-circle'} />
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
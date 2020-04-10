import React, { useState, useEffect, useContext } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { Label, Item, Input, Button, Icon } from 'native-base';
import Colors from '../constants/colors';
import { Context as UserContext } from '../contexts/userContext';

const SignUpScreen = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [age, setAge] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordMatchingBool, setPasswordMatchingBool] = useState(false);
    const [validationStatus, setValidationStatus] = useState(false);

    const userContext = useContext(UserContext);
    const { signUpUser } = userContext;

    const onFormSubmit = async (username, age, password) => {
        await signUpUser(username, age, password);
        setUsername('');
        setAge('');
        setPassword('');
        setConfirmPassword('');
        navigation.navigate('Sign In', { signedUp: true });
    }; 

    useEffect(() => {
        setPasswordMatchingBool(!(password !== confirmPassword || password === '' || confirmPassword === ''));
        if (username !== '' && age !== '' && !(password !== confirmPassword || password === '' || confirmPassword === '')) {
            setValidationStatus(true);
        } else {
            setValidationStatus(false);
        }
    }, [password, confirmPassword, username, age]);

    return (
        <View style={styles.mainViewStyle}>
            <View style={styles.bodyViewStyle}>
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
                    <Item 
                        floatingLabel
                        style={styles.formItemStyle}
                    >
                        <Label style={styles.formItemLabelStyle}>Enter your Username</Label>
                        <Input
                            value={username}
                            onChangeText={newUsername => setUsername(newUsername)}
                        />
                    </Item>
                    <Item 
                        floatingLabel
                        style={styles.formItemStyle}
                    >
                        <Label style={styles.formItemLabelStyle}>Enter your Age</Label>
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
                        <Label style={styles.formItemLabelStyle}>Enter your Password</Label>
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
                        <Label style={styles.formItemLabelStyle}>Confirm your Password</Label>
                        <Input 
                            value={confirmPassword}
                            onChangeText={newConfirmPassword => setConfirmPassword(newConfirmPassword)}
                            secureTextEntry
                            autoCapitalize='none'
                            autoCorrect={false}
                        />
                        <Icon name={passwordMatchingBool ? 'checkmark-circle' : 'close-circle'} />
                    </Item>
                    <Button 
                        style={styles.signUpButtonStyle}
                        disabled={!validationStatus}
                        onPress={() => onFormSubmit(username, age, password)}
                    >
                        <Text style={styles.buttonTextStyle}>Sign Up</Text>
                        <Icon name={validationStatus ? 'checkmark-circle' : 'close-circle'} />
                    </Button>
                    <Button 
                        style={styles.goBackButtonStyle}
                        onPress={() => navigation.navigate('Get Started')}
                    >
                        <Text style={styles.buttonTextStyle}>Go Back</Text>
                    </Button>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    bodyViewStyle: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
    },
    formItemLabelStyle: {
        color: Colors.accentLightGrayText
    },
    buttonTextStyle: {
        fontSize: 24,
        fontFamily: 'Avenir_bold',
        paddingTop: 5,
        color: Colors.accentLightWhite,
        paddingHorizontal: '3%'
    },
    formItemStyle: {
        width: '80%',
        marginVertical: '2%'
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
        borderRadius: 10,
        minWidth: '90%',
        backgroundColor: Colors.accentLightWhite,
        marginTop: '5%',
        alignItems: 'center',
        height: '70%'
    },
    mainHeaderStyle: {
        fontSize: 20,
        fontFamily: 'Avenir_bold',
        color: Colors.accentLightGrayText   
    },
    subtitleHeaderStyle: {
        marginTop: '2%',
        color: Colors.accentLightGrayText,
        fontSize: 18,
        fontFamily: 'Avenir_next'
    },
    mainViewStyle: {
        backgroundColor: Colors.accentLightGray,
        flex: 1
    }
});

export default SignUpScreen;
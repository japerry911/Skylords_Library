import React, { useState, useEffect, useContext } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { Label, Item, Input, Button, Icon } from 'native-base';
import Colors from '../constants/colors';
import { Context as UserContext } from '../contexts/userContext';
import { useFocusEffect } from '@react-navigation/native';

const SignUpScreen = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [age, setAge] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordMatchingBool, setPasswordMatchingBool] = useState(false);
    const [validationStatus, setValidationStatus] = useState(false);
    const emailRegex = new RegExp(/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/);

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
        if (username !== '' && age !== '' && emailRegex.test(email) && phone.length === 10 &&
            !(password !== confirmPassword || password === '' || confirmPassword === '')) {
            setValidationStatus(true);
        } else {
            setValidationStatus(false);
        }
    }, [password, confirmPassword, username, age, email, phone]);

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
                        success={username !== ''}
                        error={username === ''}
                    >
                        <Label style={styles.formItemLabelStyle}>Enter your Username</Label>
                        <Input
                            value={username}
                            onChangeText={newUsername => setUsername(newUsername)}
                        />
                        <Icon name={username !== '' ? 'checkmark-circle' : 'close-circle'} />
                    </Item>
                    <Item 
                        floatingLabel
                        style={styles.formItemStyle}
                        success={age !== ''}
                        error={age === ''}
                    >
                        <Label style={styles.formItemLabelStyle}>Enter your Age</Label>
                        <Input
                            value={age}
                            onChangeText={newAge => setAge(newAge.replace(/[^0-9]/g, ''))}
                            keyboardType='numeric'
                            maxLength={3}
                        />
                        <Icon name={age !== '' ? 'checkmark-circle' : 'close-circle'} />
                    </Item>
                    <Item 
                        floatingLabel
                        style={styles.formItemStyle}
                        success={emailRegex.test(email)}
                        error={!emailRegex.test(email)}
                    >
                        <Label style={styles.formItemLabelStyle}>Enter your Email</Label>
                        <Input
                            value={email}
                            onChangeText={newEmail => setEmail(newEmail)}
                        />
                        <Icon name={emailRegex.test(email) ? 'checkmark-circle' : 'close-circle'} />
                    </Item>
                    <Item 
                        floatingLabel
                        style={styles.formItemStyle}
                        success={phone.length === 10}
                        error={phone.length < 10}
                    >
                        <Label style={styles.formItemLabelStyle}>Enter your Phone Number</Label>
                        <Input
                            value={phone}
                            onChangeText={newPhone => setPhone(newPhone.replace(/[^0-9]/g, ''))}
                            keyboardType='numeric'
                            maxLength={10}
                        />
                         <Icon name={phone.length === 10 ? 'checkmark-circle' : 'close-circle'} />
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
                    <View>
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
        paddingTop: '2%',
        color: Colors.accentLightWhite,
        paddingHorizontal: '3%'
    },
    formItemStyle: {
        width: '80%',
        marginVertical: '2%'
    },
    signUpButtonStyle: {
        backgroundColor: Colors.primaryOrange,
        padding: '5%',
        marginVertical: '1%'
    },
    goBackButtonStyle: {
        backgroundColor: Colors.accentLightOrange,
        alignSelf: 'center'
    },
    formViewStyle: {
        borderRadius: 10,
        minWidth: '90%',
        backgroundColor: Colors.accentLightWhite,
        marginTop: '5%',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        height: '85%'
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
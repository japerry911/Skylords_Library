import React, { useState, useEffect } from 'react';
import { StyleSheet, ImageBackground, View } from 'react-native';
import { Text, Body, Form, Label, Input, Item, Button, Toast } from 'native-base';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Colors from '../constants/colors';
import railsServer from '../api/railsServer';
import { NavigationActions } from 'react-navigation';

const onFormSubmit = async (username, password, setInvalidLogin, successCallBack) => {
    try {
        const response = await railsServer.post('/login', { user: { username, password }});
        successCallBack(response.data.user);
    } catch (error) {
        setInvalidLogin(true);
    }
};

const SignInScreen = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [invalidLogin, setInvalidLogin] = useState(false);

    useEffect(() => {
        if (invalidLogin) {
            Toast.show({
                text: 'Invalid Credentials',
                buttonText: 'Okay',
                type: 'danger'
            });
            setInvalidLogin(false);
        }
    }, [invalidLogin]);

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
                                <Input 
                                    value={username}
                                    onChangeText={newUsername => setUsername(newUsername)}
                                    autoCapitalize='none'
                                    autoCorrect={false}
                                />
                            </Item>
                            <Item 
                                floatingLabel
                                style={styles.formItemStyle}
                            >
                                <Label style={styles.formItemLabelStyle}>Enter your Password</Label>
                                <Input 
                                    value={password}
                                    onChangeText={newPassword => setPassword(newPassword)}
                                    secureTextEntry
                                    autoCapitalize='none'
                                    autoCorrect={false}
                                />
                            </Item>
                            <Button
                                style={styles.loginButtonStyle}
                                onPress={() => onFormSubmit(username, password, setInvalidLogin, 
                                    user => navigation.navigate('Authed' , { user }))}
                            >
                                <Text style={styles.buttonText}>Login</Text>    
                            </Button>
                        </Form>
                        <Text style={styles.signUpTextStyle}>
                            Don't have an account?&nbsp;
                            <Text 
                                style={styles.signUpText}
                                onPress={() => navigation.navigate('Sign Up')}
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
import React, { useState, useEffect, useContext } from 'react';
import { Text, StyleSheet, ImageBackground, View } from 'react-native';
import { Label, Input, Item, Button, Toast } from 'native-base';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Colors from '../constants/colors';
import { Context as UserContext } from '../contexts/userContext';

const SignInScreen = ({ navigation, route }) => {
    const userContext = useContext(UserContext);
    const { signInUser } = userContext;

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [invalidLogin, setInvalidLogin] = useState(false);
    
    useEffect(() => {
        if (invalidLogin) {
            Toast.show({
                text: 'Invalid Credentials',
                buttonText: 'Okay',
                type: 'danger',
                duration: 3000
            });
            setInvalidLogin(false);
        }
    }, [invalidLogin]);

    useEffect(() => {
        if (route.params === undefined) return;
        
        if (route.params.signedUp) {
            Toast.show({
                text: 'Account Created',
                buttonText: 'Okay',
                type: 'success',
                duration: 3000
            })
        }
    }, [route]);

    const onFormSubmit = async () => {
        const loginSuccess = await signInUser(username, password);

        if (loginSuccess) {
            setUsername('');
            setPassword('')
            navigation.navigate('Authed', { screen: 'Home'});
        } else {
            setInvalidLogin(true);
        }
    };

    return (
        <ImageBackground 
        style={styles.backgroundImageStyle}
        source={require('../../assets/Library.png')}
        resizeMode='stretch'
        >
            <View style={styles.childComponents}>
                <View style={styles.bodyViewStyle}>
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
                            onPress={() => onFormSubmit()}
                        >
                            <Text style={styles.buttonText}>Login</Text>    
                        </Button>
                        <Text style={styles.signUpTextStyle}>
                            Don't have an account?&nbsp;
                            <Text 
                                style={styles.signUpText}
                                onPress={() => navigation.navigate('Sign Up')}
                            >
                                Sign Up.</Text>
                        </Text>
                    </View>
                </View>
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
    bodyViewStyle: {   
        alignItems: 'center',
        flex: 1
    },
    titleStyle: {
        color: Colors.accentLightWhite,
        fontFamily: 'Avenir_bold',
        fontSize: 35,
        marginTop: '15%'
    },
    subtitleStyle: {
        color: Colors.accentLightWhite,
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
        justifyContent: 'space-evenly',
        minHeight: '50%'
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
        minWidth: '50%'
    },
    buttonText: {
        fontSize: 24,
        fontFamily: 'Avenir_bold',
        paddingTop: 5,
        color: Colors.accentLightWhite
    }
});

export default SignInScreen;
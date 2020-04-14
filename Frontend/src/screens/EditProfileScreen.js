import React, { useState, useContext, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Label, Item, Input, Button, Icon, Toast } from 'native-base';
import Colors from '../constants/colors';
import { MaterialIcons } from '@expo/vector-icons';
import AuthedFooter from '../components/AuthedFooter';
import { Context as UserContext } from '../contexts/userContext';
import { useFocusEffect } from '@react-navigation/native';

const EditProfileScreen = ({ navigation }) => {
    const userContext = useContext(UserContext);

    const { state: userState, updateUser } = userContext;

    const [age, setAge] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [validationStatus, setValidationStatus] = useState(false);
    const [passwordMatchingBool, setPasswordMatchingBool] = useState(false);

    const emailRegex = new RegExp(/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/);

    const onFormSubmit = () => {
        const formattedPhone = phone.replace(/(\d{3})(\d{3})(\d{4})/, "$1.$2.$3");
        updateUser(userState.user.id, userState.user.token, age, email, formattedPhone, password);
        Toast.show({
            text: 'Profile Updated!',
            buttonText: 'Okay',
            type: 'success',
            duration: 3000
        });
    }; 

    useEffect(() => {
        setPasswordMatchingBool(!(password !== confirmPassword || password === '' || confirmPassword === ''));
        if (age !== '' && emailRegex.test(email) && phone.length === 10 &&
            !(password !== confirmPassword || password === '' || confirmPassword === '')) {
            setValidationStatus(true);
        } else {
            setValidationStatus(false);
        }
    }, [password, confirmPassword, age, email, phone]);

    useFocusEffect(useCallback(() => {
        setAge(userState.user.age.toString());
        setEmail(userState.user.email);
        setPhone(userState.user.phone.replace(/\./g, ''));

        return () => {
            setAge('');
            setEmail('');
            setPhone('');
            setPassword('');
            setConfirmPassword('');
            setValidationStatus(false);
            setPasswordMatchingBool(false);
        }
    }, []));

    return (
        <View style={styles.screenViewStyle}>
            <View style={styles.headerViewStyle}>
                    <TouchableOpacity 
                        onPress={() => navigation.pop()}
                    >
                        <MaterialIcons 
                            name='chevron-left'
                            size={40}
                            style={styles.backIconStyle}
                        />
                    </TouchableOpacity>
                    <Text style={styles.headerTitleStyle}>
                        Edit Profile
                    </Text>
                </View>
                <View style={styles.bodyViewStyle}>
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
                            maxLength={12}
                        />
                         <Icon name={phone.length === 10 ? 'checkmark-circle' : 'close-circle'} />
                    </Item>
                    <Item 
                        floatingLabel
                        style={styles.formItemStyle}
                        success={passwordMatchingBool}
                        error={!passwordMatchingBool}
                    >
                        <Label style={styles.formItemLabelStyle}>Enter your New Password</Label>
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
                        <Label style={styles.formItemLabelStyle}>Confirm your New Password</Label>
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
                        style={styles.makeChangesButtonStyle}
                        disabled={!validationStatus}
                        onPress={() => onFormSubmit()}
                    >
                        <Text style={styles.buttonTextStyle}>Make Changes</Text>
                        <Icon name={validationStatus ? 'checkmark-circle' : 'close-circle'} />
                    </Button>
                </View>
                <AuthedFooter parentNavigation={navigation} />
        </View>
    );
};

const styles = StyleSheet.create({
    buttonTextStyle: {
        fontSize: 24,
        fontFamily: 'Avenir_bold',
        paddingTop: '1%',
        color: Colors.accentLightWhite,
        paddingHorizontal: '3%'
    },
    formItemLabelStyle: {
        color: Colors.accentLightGrayText
    },
    makeChangesButtonStyle: {
        backgroundColor: Colors.primaryOrange,
        padding: '5%',
        marginTop: '2%'
    },
    formItemStyle: {
        width: '80%',
        marginVertical: '2%'
    },
    bodyViewStyle: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        backgroundColor: Colors.accentLightWhite,
        width: '90%',
        alignSelf: 'center',
        borderRadius: 10
    },
    screenViewStyle: {
        backgroundColor: Colors.accentLightGray,
        flex: 1,
    },
    headerTitleStyle: {
        color: Colors.accentLightGrayText,
        fontSize: 24,
        fontFamily: 'Avenir_bold',
    },
    backIconStyle: {
        height: 50,
        color: Colors.primaryOrange
    },
    headerViewStyle: {
        marginTop: '5%',
        marginLeft: '5%',
        flexDirection: 'row',
        alignItems: 'center',
    }
});

export default EditProfileScreen;
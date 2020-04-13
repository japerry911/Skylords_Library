import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Colors from '../constants/colors';
import { MaterialIcons } from '@expo/vector-icons';
import AuthedFooter from '../components/AuthedFooter';

const ProfileScreen = ({ navigation }) => {
    return (
        <View style={styles.mainViewStyle}>
            <View style={styles.headerViewStyle}>
                <TouchableOpacity onPress={() => {
                    navigation.navigate('Home');
                }}>
                    <MaterialIcons 
                        name='chevron-left'
                        size={40}
                        style={styles.backIconStyle}
                    />
                </TouchableOpacity>
                <Text style={styles.headerTitleStyle}>
                    My Profile
                </Text>
            </View>
            <View style={styles.bodyViewStyle}></View>
            <AuthedFooter parentNavigation={navigation} />
        </View>
    );
};

const styles = StyleSheet.create({
    mainViewStyle: {
        backgroundColor: Colors.accentLightGray,
        flex: 1
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
        
    },
    headerTitleStyle: {
        color: Colors.accentLightGrayText,
        fontSize: 24,
        fontFamily: 'Avenir_bold'
    }, 
    bodyViewStyle: {
        backgroundColor: Colors.accentLightWhite,
        flex: 1,
        marginHorizontal: '4%',
        paddingHorizontal: '4%',
        borderRadius: 10,
        alignItems: 'center',
        paddingTop: '2%'
    }
});

export default ProfileScreen;
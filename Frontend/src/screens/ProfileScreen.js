import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import Colors from '../constants/colors';
import { MaterialIcons, Foundation } from '@expo/vector-icons';
import AuthedFooter from '../components/AuthedFooter';
import { Context as UserContext } from '../contexts/userContext';

const ProfileScreen = ({ navigation }) => {
    const userContext = useContext(UserContext);

    const { state: userState } = userContext
    
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
            <View style={styles.bodyViewStyle}>
                <FlatList
                    ListHeaderComponent={
                        <>
                            <Text style={styles.titleTextStyle}>
                                {userState.user.username}
                            </Text>
                            <Text style={styles.subtitleTextStyle}>
                                Age: {userState.user.age}
                            </Text>
                            <Text style={styles.mobileEmailTextStyle}>
                                Mobile
                            </Text>
                            <View style={styles.mobileEmailViewStyle}>
                                <MaterialIcons
                                    style={styles.phoneIconStyle}
                                    name='phone-in-talk'
                                    size={40}
                                />
                                <View style={styles.textViewStyle}>
                                    <Text style={styles.mobileEmailValueStyle}>
                                        {userState.user.phone}
                                    </Text>
                                </View>
                            </View>
                            <Text style={styles.mobileEmailTextStyle}>
                                Email
                            </Text>
                            <View style={styles.mobileEmailViewStyle}>
                                <Foundation
                                    style={styles.emailIconStyle}
                                    name='mail'
                                    size={40}
                                />
                                <View style={styles.textViewStyle}>
                                    <Text style={styles.mobileEmailValueStyle}>
                                        {userState.user.email}
                                    </Text>
                                </View>
                            </View>
                        </>
                    }
                />
            </View>
            <AuthedFooter parentNavigation={navigation} />
        </View>
    );
};

const styles = StyleSheet.create({
    textViewStyle: {
        backgroundColor: Colors.primaryOrange,
        width: '80%',
        padding: '2%',
        borderRadius: 10
    },
    mobileEmailValueStyle: {
        color: Colors.accentLightWhite,
        fontSize: 18
    },
    emailIconStyle: {
        marginHorizontal: '3%',
        color: Colors.primaryOrange
    },
    phoneIconStyle: {
        marginHorizontal: '2%',
        color: Colors.primaryOrange
    },
    mobileEmailTextStyle: {
        fontFamily: 'Avenir_bold',
        fontSize: 18,
        color: Colors.accentLightGrayText,
        marginTop: '5%'
    },
    mobileEmailViewStyle: {
        flexDirection: 'row',
        alignSelf: 'flex-start',
        alignItems: 'center'
    },
    subtitleTextStyle: {
        fontSize: 18,
        fontFamily: 'Avenir_medium',
        color: Colors.accentLightGrayText,
        textAlign: 'center'
    },
    titleTextStyle: {
        fontSize: 24,
        fontFamily: 'Avenir_medium',
        color: 'black',
        textAlign: 'center'
    },
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
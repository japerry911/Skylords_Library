import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Colors from '../constants/colors';
import { MaterialIcons } from '@expo/vector-icons';
import AuthedFooter from '../components/AuthedFooter';

const FavoritesScreen = () => {
    return (
        <View style={styles.mainViewStyle}>
            <View style={styles.headerViewStyle}>
                <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                    <MaterialIcons 
                        name='chevron-left'
                        size={40}
                        style={styles.backIconStyle}
                    />
                </TouchableOpacity>
                <View style={styles.headerTextViewStyle}>
                    <Text style={styles.headerTitleStyle}>
                        Your Books
                    </Text>
                    <Text style={styles.subtitleTitleStyle}>
                        Check our your saved books.
                    </Text>
                </View>
            </View>
            <View style={styles.bodyViewStyle}>
            </View>
            <AuthedFooter />
        </View>
    );
};

const styles = StyleSheet.create({
    mainViewStyle: {
        backgroundColor: Colors.accentLightGray,
        flex: 1
    },
    subtitleTitleStyle: {
        color: Colors.accentLightGrayText,
        fontSize: 14,
        fontFamily: 'Avenir_medium'
    },
    backIconStyle: {
        color: Colors.primaryOrange
    },
    headerViewStyle: {
        marginTop: '5%',
        marginLeft: '5%',
        flexDirection: 'row',
    },
    headerTitleStyle: {
        color: Colors.accentLightGrayText,
        fontSize: 24,
        fontFamily: 'Avenir_bold'
    },
    bodyViewStyle: {
        backgroundColor: Colors.accentLightWhite,
        flex: 1, 
        marginTop: '5%',
        marginBottom: '2%',
        marginHorizontal: '5%',
        paddingHorizontal: '5%',
        borderRadius: 10
    }
});

export default FavoritesScreen;
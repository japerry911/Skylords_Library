import React from 'react';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import Colors from '../constants/colors';

const FooterButton = ({ parentNavigation, destination }) => {
    return (
        <TouchableOpacity onPress={() => parentNavigation.navigate(destination)}>
            <View 
                style={styles.footerStyle}
            >
                <Text style={styles.footerTextStyle}>{destination}</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    footerTextStyle: {
        color: Colors.accentLightWhite,
        fontSize: 30,
        fontFamily: 'Avenir_bold',
        marginTop: '4%'
    },
    footerStyle: {
        backgroundColor: Colors.primaryOrange,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%'
    }
});

export default FooterButton;
import React from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Footer } from 'native-base';
import Colors from '../constants/colors';

const FooterButton = ({ parentNavigation }) => {
    return (
        <TouchableOpacity onPress={() => parentNavigation.navigate('Get Started')}>
            <Footer 
                style={styles.footerStyle}
            >
                <Text style={styles.footerTextStyle}>Get Started</Text>
            </Footer>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    footerTextStyle: {
        color: 'white',
        fontSize: 30,
        fontFamily: 'Avenir_bold',
        marginTop: 10
    },
    footerStyle: {
        backgroundColor: Colors.primaryOrange,
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export default FooterButton;
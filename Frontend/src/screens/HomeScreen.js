import React from 'react';
import { StyleSheet } from 'react-native';
import { Container, Body, Footer } from 'native-base';
import Colors from '../constants/colors';

const HomeScreen = ({ navigation }) => {
    console.log(navigation.getParam('user'));

    return (
        <Container style={styles.mainContainerStyle}>
            <Body style={styles.bodyStyle}>
            </Body>
            <Footer style={styles.footerStyle}>

            </Footer>
        </Container>
    );
};

const styles = StyleSheet.create({
    mainContainerStyle: {
        backgroundColor: Colors.accentLightGray
    },
    bodyStyle: {
        backgroundColor: Colors.accentLightWhite,
        width: '90%',
        height: '100%',
        borderRadius: 10,
        marginTop: '5%'
    },
    footerStyle: {
        backgroundColor: Colors.accentLightGray
    }
});

export default HomeScreen;
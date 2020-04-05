import React from 'react';
import { StyleSheet } from 'react-native';
import { Container, Text } from 'native-base';

const WelcomeScreen = ({ navigation }) => {
    return (
        <Container style={styles.containerScreenStyle}>
            <Text>WELCOME SCREEN</Text>
        </Container>
    );
};

const styles = StyleSheet.create({
    containerScreenStyle: {
        justifyContent: 'center',
        flex: 1,
        alignItems: 'center'
    }
});

export default WelcomeScreen;
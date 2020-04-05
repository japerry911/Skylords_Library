import React from 'react';
import { StyleSheet } from 'react-native';
import { Container, Text } from 'native-base';

const SignInScreen = () => {
    return (
        <Container style={styles.screenStyle}>
            <Text>SignIn Screen</Text>
        </Container>
    );
};

const styles = StyleSheet.create({
    screenStyle: {
        flex: 1,
        justifyContent: 'center', 
        alignItems: 'center'
    }
});

export default SignInScreen;
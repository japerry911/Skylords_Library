import React from 'react';
import { StyleSheet } from 'react-native';
import { Text, Container } from 'native-base';

const WelcomeScreen = () => {
    return (
        <Container style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
            <Text>Welcome Screen!</Text>
        </Container>
    );
};

const styles = StyleSheet.create({});

export default WelcomeScreen;
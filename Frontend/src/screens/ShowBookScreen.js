import React from 'react';
import { Container, Text } from 'native-base';
import { StyleSheet } from 'react-native';

const ShowBookScreen = ({ route }) => {
    return (
        <Container>
            <Text>Show Book Screen - {route.params.bookId} </Text>
        </Container>
    );
};

const styles = StyleSheet.create({});

export default ShowBookScreen;
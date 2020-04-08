import React, { useEffect, useState } from 'react';
import { Container, Text } from 'native-base';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import Colors from '../constants/colors';

const ShowBookScreen = ({ route, navigation }) => {
    const [bookDetails, setBookDetails] = useState({});
    const bookId = route.params.bookId;

    useEffect(() => {}, []);

    return (
        <Container>
            <View style={styles.headerViewStyle}>
                <TouchableOpacity onPress={() => navigation.pop()}>
                    <MaterialIcons 
                        name='chevron-left'
                        size={40}
                        style={styles.backIconStyle}
                    />
                </TouchableOpacity>
                <Text style={styles.headerTitleStyle}>
                    BookTitle!!
                </Text>
            </View>
        </Container>
    );
};

const styles = StyleSheet.create({
    backIconStyle: {
        height: 50,
        color: Colors.primaryOrange
    },
    mainContainerStyle: {
        backgroundColor: Colors.accentLightGray
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
    }
});

export default ShowBookScreen;
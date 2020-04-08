import React, { useEffect, useState } from 'react';
import { StyleSheet, View, TouchableOpacity, FlatList } from 'react-native';
import { Container, Text } from 'native-base';
import Colors from '../constants/colors';
import { MaterialIcons } from '@expo/vector-icons';

const BooksScreen = ({ navigation }) => {
    const [booksData, setBooksData] = useState([]);

    return (
        <Container style={styles.mainContainerStyle}>
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
                        All Books
                    </Text>
                    <Text style={styles.subtitleTitleStyle}>
                        Let's find your new favorite book.
                    </Text>
                </View>
            </View>
            <View style={styles.flatListViewStyle}>
                <FlatList
                />
            </View>
        </Container>
    );
};

const styles = StyleSheet.create({
    flatListViewStyle: {
        backgroundColor: Colors.accentLightWhite,
        flex: 1, 
        marginTop: '5%',
        marginBottom: '15%',
        marginHorizontal: '10%',
        borderRadius: 10
    },
    subtitleTitleStyle: {
        color: Colors.accentLightGrayText,
        fontSize: 14,
        fontFamily: 'Avenir_medium'
    },
    backIconStyle: {
        color: Colors.primaryOrange
    },
    mainContainerStyle: {
        backgroundColor: Colors.accentLightGray
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
    }
});

export default BooksScreen;
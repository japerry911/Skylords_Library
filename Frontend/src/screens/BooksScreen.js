import React, { useEffect, useState } from 'react';
import { StyleSheet, View, TouchableOpacity, FlatList } from 'react-native';
import { Container, Text } from 'native-base';
import Colors from '../constants/colors';
import { MaterialIcons } from '@expo/vector-icons';
import axios from 'axios';
import railsServer from '../api/railsServer';

const BooksScreen = ({ navigation }) => {
    const [booksData, setBooksData] = useState([]);

    useEffect(() => {
        const CancelToken = axios.CancelToken;
        const source = CancelToken.source();

        try {
            railsServer.get('/books', { cancelToken: source.token })
                .then(response => setBooksData(response.data.books));
        } catch (error) {
            if (axios.isCancel(error)) {
                console.log('Canceled');
            } else {
                throw error;
            }
        }
    }, []);

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
                    data={booksData}
                    keyExtractor={book => book.id}
                    renderItem={({ item }) => <Text>{item.title}</Text>}
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
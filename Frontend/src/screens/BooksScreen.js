import React, { useEffect, useState } from 'react';
import { StyleSheet, View, TouchableOpacity, FlatList } from 'react-native';
import { Container, Text, Footer } from 'native-base';
import Colors from '../constants/colors';
import { MaterialIcons, MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons';
import axios from 'axios';
import railsServer from '../api/railsServer';
import BookListItem from '../components/BookListItem';
import FooterIconButton from '../components/FooterIconButton';

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
                    style={styles.flatListStyle}
                    data={booksData}
                    keyExtractor={book => book.id}
                    renderItem={({ item }) => <BookListItem 
                                                bookId={item.id}
                                                title={item.title} 
                                                author={item.author.name}
                                                imageUrl={item.image_url}
                                                description={item.description}
                                                navigation={navigation}
                                            />}
                    showsVerticalScrollIndicator={false}
                />
            </View>
            <Footer style={styles.footerStyle}>
                <FooterIconButton
                    iconComponent={<MaterialCommunityIcons
                                        name='home-outline'
                                        size={35}
                                        style={styles.footerIconStyle}
                                    />}
                    onPress={() => {}}
                />
                <FooterIconButton
                    iconComponent={<FontAwesome
                                        name='star-o'
                                        size={35}
                                        style={styles.footerIconStyle}
                                    />}
                    onPress={() => {}}
                />
                <FooterIconButton
                    iconComponent={<FontAwesome
                                        name='bookmark-o'
                                        size={32}
                                        style={styles.footerIconStyle}
                                    />}
                    onPress={() => {}}
                />
                <FooterIconButton
                    iconComponent={<FontAwesome
                                        name='user-o'
                                        size={32}
                                        style={styles.footerIconStyle}
                                    />}
                    onPress={() => {}}
                />
            </Footer>
        </Container>
    );
};

const styles = StyleSheet.create({
    flatListStyle: {
        flex: 1
    },
    footerIconStyle: {
        marginTop: 5,
        color: Colors.primaryOrange
    },
    footerStyle: {
        justifyContent: 'space-evenly',
        backgroundColor: Colors.accentLightGray
    },
    flatListViewStyle: {
        backgroundColor: Colors.accentLightWhite,
        flex: 1, 
        marginTop: '5%',
        marginBottom: '2%',
        marginHorizontal: '5%',
        paddingHorizontal: '5%',
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
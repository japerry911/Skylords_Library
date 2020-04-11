import React, { useEffect, useContext, useState } from 'react';
import { StyleSheet, View, TouchableOpacity, FlatList, Text } from 'react-native';
import Colors from '../constants/colors';
import { MaterialIcons } from '@expo/vector-icons';
import BookListItem from '../components/BookListItem';
import AuthedFooter from '../components/AuthedFooter';
import { Context as BookContext } from '../contexts/bookContext';
import Spinner from '../components/Spinner';

const BooksScreen = ({ navigation }) => {
    const [isLoading, setIsLoading] = useState(true);

    const bookContext = useContext(BookContext);
    const { state: bookState, getBooks } = bookContext;    

    useEffect(() => {
        getBooks();
    }, []);

    useEffect(() => {
        if (bookState.books.length > 0) {
            setIsLoading(false);
        }
    }, [bookState.books])

    return (
        <>
            {isLoading ? <Spinner />
            :
            <View style={styles.mainViewStyle}>
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
                        data={bookState.books}
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
                <AuthedFooter parentNavigation={navigation} />
            </View>}
        </>
    );
};

const styles = StyleSheet.create({
    flatListStyle: {
        flex: 1
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
    mainViewStyle: {
        backgroundColor: Colors.accentLightGray,
        flex: 1
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
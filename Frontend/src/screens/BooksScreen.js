import React, { useEffect, useContext, useState, useCallback } from 'react';
import { StyleSheet, View, TouchableOpacity, FlatList, Text } from 'react-native';
import Colors from '../constants/colors';
import { MaterialIcons } from '@expo/vector-icons';
import BookListItem from '../components/BookListItem';
import AuthedFooter from '../components/AuthedFooter';
import { Context as BookContext } from '../contexts/bookContext';
import { Context as UserContext } from '../contexts/userContext';
import Spinner from '../components/Spinner';
import { useFocusEffect } from '@react-navigation/native';

const BooksScreen = ({ navigation }) => {
    const [isLoading, setIsLoading] = useState(true);

    const bookContext = useContext(BookContext);
    const userContext = useContext(UserContext);

    const { state: bookState, getBooks } = bookContext;    
    const { state: userState } = userContext;

    useFocusEffect(useCallback(() => {
        getBooks(userState.user.token);
        return () => setIsLoading(true);
    }, []))

    useEffect(() => {
        setIsLoading(false);
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
                <View style={styles.bodyViewStyle}>
                    <FlatList
                        data={bookState.books}
                        keyExtractor={book => book.id}
                        renderItem={({ item }) =><BookListItem 
                                                    bookId={item.id}
                                                    title={item.title} 
                                                    author={item.author.name}
                                                    imageUrl={item.image_url}
                                                    description={item.description}
                                                    navigation={navigation}
                                                 />
                        }
                        showsVerticalScrollIndicator={false}
                    />
                </View>
                <AuthedFooter parentNavigation={navigation} />
            </View>}
        </>
    );
};

const styles = StyleSheet.create({
    bodyViewStyle: {
        backgroundColor: Colors.accentLightWhite,
        flex: 1, 
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
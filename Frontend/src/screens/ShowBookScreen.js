import React, { useEffect, useState, useContext, useCallback, useRef } from 'react';
import { Button, Toast } from 'native-base';
import { Text, StyleSheet, TouchableOpacity, View, Image, FlatList } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import Colors from '../constants/colors';
import { Rating } from 'react-native-ratings';
import ShowReviewItem from '../components/ShowReviewItem';
import { StackActions } from '@react-navigation/native';
import AuthedFooter from '../components/AuthedFooter';
import { Context as BookContext } from '../contexts/bookContext';
import { Context as FavoritesContext } from '../contexts/favoriteContext';
import { Context as UserContext } from '../contexts/userContext';
import Spinner from '../components/Spinner';
import { useFocusEffect } from '@react-navigation/native';

const calcAverageRating = reviews => {
    const total = reviews.reduce((total, review) => total + review.rating, 0);
    if (total === 0) {
        return 0;
    } else {
        return total / reviews.length;
    }
};

const ShowBookScreen = ({ route, navigation }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [averageRating, setAverageRating] = useState(0);

    const bookId = route.params.bookId;

    const bookContext = useContext(BookContext);
    const favoriteContext = useContext(FavoritesContext);
    const userContext = useContext(UserContext);

    const { addFavorite } = favoriteContext;
    const { state: bookState, getShowBook, clearShowBook } = bookContext;
    const { state: userState } = userContext;

    const firstUpdate = useRef(true);

    useFocusEffect(useCallback(() => {
        getShowBook(userState.user.token, bookId);

        return () => {
            clearShowBook();
            setIsLoading(true);
            firstUpdate.current = true;
        };
    }, []));

    useEffect(() => {
        if (bookState.showBook.reviews !== undefined && firstUpdate.current) {
            setAverageRating(calcAverageRating(bookState.showBook.reviews));
            firstUpdate.current = false;
        }
        setIsLoading(false);
    }, [bookState.showBook]);

    return (
        <> 
            {isLoading ? <Spinner />
            :
            <View style={styles.mainViewStyle}>
                <View style={styles.headerViewStyle}>
                    <TouchableOpacity onPress={() => navigation.pop()}>
                        <MaterialIcons 
                            name='chevron-left'
                            size={40}
                            style={styles.backIconStyle}
                        />
                    </TouchableOpacity>
                    <Text style={styles.headerTitleStyle}>
                        {bookState.showBook.title}
                    </Text>
                </View>
                <View style={styles.flatListViewStyle}>
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        ListHeaderComponent={
                            <View style={styles.flatListHeaderFooterStyle}>
                                <Text style={styles.descriptionTextStyle}>
                                    {bookState.showBook.description}
                                </Text>
                                <Rating 
                                    type='star'
                                    startingValue={averageRating}
                                    imageSize={20}
                                    tintColor={Colors.accentLightWhite}
                                    selectedColor={Colors.primaryOrange}
                                    type='custom'
                                    ratingColor={Colors.primaryOrange}
                                    readonly
                                />
                                <Image
                                    source={{ uri: bookState.showBook.image_url }}
                                    style={styles.imageStyle}
                                />
                            </View>}
                        data={bookState.showBook.reviews}
                        renderItem={({ item }) => <ShowReviewItem review={item} />}
                        ListFooterComponent={
                            <View style={styles.flatListHeaderFooterStyle}>
                                <Button 
                                    style={styles.buttonStyle}
                                    onPress={() => {
                                        navigation.dispatch(StackActions.replace('Books'));
                                        navigation.navigate('Add a Review', 
                                        { params: { title: bookState.showBook.title, author: bookState.showBook.author.name, 
                                            existingBool: true }})
                                    }}
                                >
                                    <Text style={styles.buttonText}>
                                        Add a Review
                                    </Text>
                                </Button>
                                <Button
                                    style={styles.buttonStyle}
                                    onPress={() => {
                                        navigation.dispatch(StackActions.replace('Books'));
                                        addFavorite(userState.user.token, bookId, userState.user.id);
                                        Toast.show({
                                            text: 'Added to Favorites',
                                            buttonText: 'Okay',
                                            type: 'success',
                                            duration: 3000
                                        });
                                    }}
                                >
                                    <Text style={styles.buttonText}>
                                        Add to Favorites
                                    </Text>
                                </Button>
                            </View>
                        }
                    />
                </View>
                <AuthedFooter parentNavigation={navigation} />
            </View>}
        </>
    );
};

const styles = StyleSheet.create({
    buttonStyle: {
        backgroundColor: Colors.primaryOrange,
        marginVertical: 15,
        justifyContent: 'center',
        alignItems: 'center',
        minWidth: '50%',
        alignSelf: 'center'
    },
    buttonText: {
        fontFamily: 'Avenir_bold',
        fontSize: 16,
        paddingTop: '3%',
        color: Colors.accentLightWhite
    },
    flatListHeaderFooterStyle: {
        justifyContent: 'center', 
        alignItems: 'center'
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
        marginBottom: '2%',
        marginHorizontal: '5%',
        paddingHorizontal: '5%',
        borderRadius: 10
    },
    averageRatingStyle: {
        justifyContent: 'center',
        textAlign: 'center'
    },
    imageStyle: {
        height: 200, 
        width: 125,
        opacity: .50,
        marginVertical: '3%'
    },
    descriptionTextStyle: {
        fontFamily: 'Avenir_medium',
        color: Colors.accentLightGrayText,
        padding: 10
    },
    backIconStyle: {
        height: 50,
        color: Colors.primaryOrange
    },
    mainViewStyle: {
        flex: 1,
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
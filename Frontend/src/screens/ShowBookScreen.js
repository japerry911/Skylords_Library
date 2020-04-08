import React, { useEffect, useState } from 'react';
import { Container, Text, Body } from 'native-base';
import { StyleSheet, TouchableOpacity, View, Image, FlatList } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import Colors from '../constants/colors';
import axios from 'axios';
import railsServer from '../api/railsServer';
import { Rating } from 'react-native-ratings';
import ShowReviewItem from '../components/ShowReviewItem';

const calcAverageRating = reviews => {
    const total = reviews.reduce((total, review) => total + review.rating, 0);
    return total / reviews.length;
};

const ShowBookScreen = ({ route, navigation }) => {
    const [bookDetails, setBookDetails] = useState({});
    const [averageRating, setAverageRating] = useState(0);

    const bookId = route.params.bookId;

    useEffect(() => {
        const CancelToken = axios.CancelToken
        const source = CancelToken.source()

        try {
            railsServer.get(`/books/${bookId}`, { cancelToken: source.token })
                .then(response => setBookDetails(response.data.book));
        } catch (error) {
            if (axios.isCancel(error)) {
                console.log('Canceled');
            } else {
                throw error;
            }
        }
    }, []);

    useEffect(() => {
        if (bookDetails.reviews !== undefined) {
            setAverageRating(calcAverageRating(bookDetails.reviews));
        }
    }, [bookDetails]);

    return (
        <Container style={styles.mainContainerStyle}>
            <View style={styles.headerViewStyle}>
                <TouchableOpacity onPress={() => navigation.pop()}>
                    <MaterialIcons 
                        name='chevron-left'
                        size={40}
                        style={styles.backIconStyle}
                    />
                </TouchableOpacity>
                <Text style={styles.headerTitleStyle}>
                    {bookDetails.title}
                </Text>
            </View>
            <Body style={styles.mainBodyStyle}>
                <Text style={styles.descriptionTextStyle}>
                    {bookDetails.description}
                </Text>
                <Rating 
                    type='star'
                    startingValue={averageRating}
                    imageSize={20}
                    tintColor={Colors.accentLightWhite}
                    selectedColor={Colors.primaryOrange}
                    type='custom'
                    ratingColor={Colors.primaryOrange}
                />
                <Image
                    source={{ uri: bookDetails.image_url }}
                    style={styles.imageStyle}
                />
                <View style={styles.flatListViewStyle}>
                    <FlatList
                        data={bookDetails.reviews}
                        keyExtractor={review => review.id}
                        renderItem={({ item }) => <ShowReviewItem 
                                                    description={item.description}
                                                  />}
                    />
                </View>
            </Body>
        </Container>
    );
};

const styles = StyleSheet.create({
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
    mainBodyStyle: {
        backgroundColor: Colors.accentLightWhite,
        borderRadius: 10,
        marginHorizontal: '2%',
        alignItems: 'center'
    },
    backIconStyle: {
        height: 50,
        color: Colors.primaryOrange
    },
    mainContainerStyle: {
        backgroundColor: Colors.accentLightGray,
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
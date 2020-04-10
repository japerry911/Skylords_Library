import React, { useEffect, useState } from 'react';
import { Container, Text, Body, Footer, Button } from 'native-base';
import { StyleSheet, TouchableOpacity, View, Image, FlatList } from 'react-native';
import { MaterialIcons, MaterialCommunityIcons, FontAwesome, AntDesign } from '@expo/vector-icons';
import Colors from '../constants/colors';
import axios from 'axios';
import railsServer from '../api/railsServer';
import { Rating } from 'react-native-ratings';
import ShowReviewItem from '../components/ShowReviewItem';
import FooterIconButton from '../components/FooterIconButton';

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
                .then(response => setBookDetails(response.data));
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
            <Body>
                <View style={styles.flatListViewStyle}>
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        ListHeaderComponent={
                            <View style={styles.flatListHeaderFooterStyle}>
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
                                    readonly
                                />
                                <Image
                                    source={{ uri: bookDetails.image_url }}
                                    style={styles.imageStyle}
                                />
                            </View>}
                        data={bookDetails.reviews}
                        renderItem={({ item }) => <ShowReviewItem review={item} />}
                        ListFooterComponent={
                            <View style={styles.flatListHeaderFooterStyle}>
                                <Button 
                                    style={styles.addReviewButtonStyle}
                                    onPress={() => navigation.navigate('Add a Review', 
                                    { params: { title: bookDetails.title, author: bookDetails.author.name, existingBool: true }})}
                                >
                                    <Text style={styles.buttonText}>
                                        Add a Review
                                    </Text>
                                </Button>
                            </View>
                        }
                    />
                </View>
            </Body>
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
                    iconComponent={<AntDesign
                                        name='book'
                                        size={35}
                                        style={styles.footerIconStyle}
                                    />}
                    onPress={() => navigation.navigate('Books')}
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
    addReviewButtonStyle: {
        backgroundColor: Colors.primaryOrange,
        marginVertical: 15,
        justifyContent: 'center',
        alignItems: 'center',
        minWidth: '40%',
        alignSelf: 'center'
    },
    buttonText: {
        fontFamily: 'Avenir_bold',
        fontSize: 16,
        paddingTop: '3%'
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
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Image } from 'react-native';
import { Container, Body, Footer, Text } from 'native-base';
import Colors from '../constants/colors';
import { SimpleLineIcons, FontAwesome, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import railsServer from '../api/railsServer';
import { Rating } from 'react-native-ratings';

const HomeScreen = ({ navigation }) => {
    const user = navigation.getParam('user');
    const [mostRecentObject, setMostRecentObject] = useState({ user: {}, book: {}, review: {} });

    useEffect(() => {
        const fetchMostRecentReview = async () => {
            const response = await railsServer.get('/most_recent_review');
            setMostRecentObject(response.data);
        }

        fetchMostRecentReview();
    }, []);

    return (
        <Container style={styles.mainContainerStyle}>
            <Body style={styles.bodyStyle}>
                <Text style={styles.greetingMessageStyle}>
                    Hello, {user.username}!
                </Text>
                <Text style={styles.subtitleGreetingStyle}>
                    Let's find your new favorite book.
                </Text>
                <View style={styles.bodyIconViewStyle}>
                    <TouchableOpacity>
                        <View style={styles.iconViewStyle}>
                            <SimpleLineIcons
                                name='book-open'
                                style={styles.iconStyle}
                                size={25}
                            />
                            <Text style={styles.iconTextStyle}>
                                All
                            </Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <View style={styles.iconViewStyle}>
                            <FontAwesome
                                name='pencil-square-o'
                                style={styles.iconStyle}
                                size={28}
                            />
                            <Text style={styles.iconTextStyle}>
                                Tell Us
                            </Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <View style={styles.iconViewStyle}>
                            <MaterialCommunityIcons
                                name='fire'
                                style={styles.iconStyle}
                                size={27}
                            />
                            <Text style={styles.iconTextStyle}>
                                Trending
                            </Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <View style={styles.iconViewStyle}>
                            <MaterialIcons 
                                name='message'
                                style={styles.iconStyle}
                                size={28}
                            />
                            <Text style={styles.iconTextStyle}>
                                Reviews
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={styles.mostRecentViewStyle}>
                    <Text style={styles.mostRecentTitleStyle}>
                        Recent Reviews
                    </Text>
                    <View style={styles.mostRecentImageViewStyle}>
                        <Image
                            source={{ uri: mostRecentObject.book.image_url }}
                            style={styles.mostRecentImageStyle}
                        />                        
                        <TouchableOpacity style={styles.bookmarkIconStyle}>
                        <MaterialIcons
                            name='bookmark'
                            style={styles.bookmarkIconStyle}
                            size={25}
                        />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.mostRecentReviewStyle}>
                        <Text style={styles.mostRecentReviewTextStyle}>
                            "{mostRecentObject.review.description}" {'\n\t'}- {mostRecentObject.user.username}
                        </Text>
                        <View style={{alignItems: 'center', justifyContent: 'center'}}>
                            <Rating 
                                type='star'
                                startingValue={mostRecentObject.review.rating}
                                imageSize={20}
                                tintColor={Colors.accentLightGray}
                                selectedColor={Colors.primaryOrange}
                                type='custom'
                                ratingColor={Colors.primaryOrange}
                            />
                        </View>
                    </View>
                </View>
            </Body>
            <Footer style={styles.footerStyle}>

            </Footer>
        </Container>
    );
};

const styles = StyleSheet.create({
    bookmarkIconStyle: {
        position: 'absolute',
        top: 0,
        right: 0,
        color: Colors.primaryOrange
    },
    iconTextStyle: {
        fontSize: 11,
        fontFamily: 'Avenir_bold',
        color: Colors.accentLightGrayText,
        textAlign: 'center'
    },
    mostRecentImageStyle: {
        height: 200, 
        width: 125, 
        opacity: .75
    },
    mostRecentViewStyle: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    mostRecentReviewStyle: {
        backgroundColor: Colors.accentLightGray,
        padding: 10,
        marginVertical: 5,
        borderRadius: 10
    },
    mostRecentReviewTextStyle: {
        color: Colors.accentLightGrayText,
        fontFamily: 'Avenir_italicize'
    },
    mostRecentTitleStyle: {
        fontSize: 20,
        fontFamily: 'Avenir_medium',
        marginTop: '10%',
        color: Colors.accentLightGrayText
    },
    mostRecentImageViewStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        maxWidth: '90%',
        overflow: 'hidden',
        marginTop: 20,
    },
    iconViewStyle: {
        backgroundColor: Colors.accentLightGray,
        paddingHorizontal: 5,
        paddingVertical: 5,
        borderRadius: 10,
        alignItems: 'center',
        marginHorizontal: 20
    },
    iconStyle: {
        color: Colors.primaryOrange
    },
    bodyIconViewStyle: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
        width: '70%' ,
        justifyContent: 'space-evenly'
    },
    greetingMessageStyle: {
        marginTop: '10%',
        fontSize: 20,
        fontFamily: 'Avenir_bold',
        color: Colors.accentLightGrayText
    },
    subtitleGreetingStyle: {
        fontFamily: 'Avenir_next',
        color: Colors.accentLightGrayText,
        fontSize : 16,
        marginTop: '3%'
    },
    mainContainerStyle: {
        backgroundColor: Colors.accentLightGray
    },
    bodyStyle: {
        backgroundColor: Colors.accentLightWhite,
        width: '90%',
        height: '100%',
        borderRadius: 10,
        marginTop: '5%',
    },
    footerStyle: {
        backgroundColor: Colors.accentLightGray
    }
});

export default HomeScreen;
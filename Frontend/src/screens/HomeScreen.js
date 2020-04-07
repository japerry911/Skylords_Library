import React, { useEffect, useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Image } from 'react-native';
import { Container, Body, Footer, Text } from 'native-base';
import Colors from '../constants/colors';
import { SimpleLineIcons, FontAwesome, MaterialCommunityIcons, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import railsServer from '../api/railsServer';
import { Rating } from 'react-native-ratings';
import FooterIconButton from '../components/FooterIconButton';
import axios from 'axios';

const HomeScreen = ({ navigation }) => {
    const user = navigation.getParam('user');
    const [mostRecentObject, setMostRecentObject] = useState({ user: {}, book: {}, review: {} });
    
    useEffect(() => {
        const CancelToken = axios.CancelToken
        const source = CancelToken.source()

        try {
            railsServer.get('/most_recent_review', { cancelToken: source.token })
                .then(response => setMostRecentObject(response.data));
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
            <Body style={styles.bodyStyle}>
                <Text style={styles.greetingMessageStyle}>
                    Hello, {user.username}!
                </Text>
                <Text style={styles.subtitleGreetingStyle}>
                    Let's find your new favorite book.
                </Text>
                <View style={styles.bodyIconViewStyle}>
                    <TouchableOpacity style={styles.iconTOStyle}>
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
                    <TouchableOpacity style={styles.iconTOStyle}>
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
                    <TouchableOpacity style={styles.iconTOStyle}>
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
                    <TouchableOpacity style={styles.iconTOStyle}>
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
                    </View>
                    <View style={styles.mostRecentReviewStyle}>
                        <Text style={styles.mostRecentReviewItalStyle}>
                            "{mostRecentObject.review.description}" {'\n\t'}- <Text style={styles.mostRecentReviewMedStyle}>
                                {mostRecentObject.user.username}</Text>
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
    footerStyle: {
        justifyContent: 'space-evenly',
        backgroundColor: Colors.accentLightGray
    },
    footerIconStyle: {
        marginTop: 5,
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
        height: '80%',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingBottom: '10%'
    },
    mostRecentReviewStyle: {
        backgroundColor: Colors.accentLightGray,
        padding: 10,
        marginVertical: 5,
        borderRadius: 10
    },
    mostRecentReviewItalStyle: {
        color: Colors.accentLightGrayText,
        fontFamily: 'Avenir_italicize'
    },
    mostRecentReviewMedStyle: {
        color: Colors.accentLightGrayText,
        fontFamily: 'Avenir_medium'
    },
    mostRecentTitleStyle: {
        fontSize: 20,
        fontFamily: 'Avenir_medium',
        marginTop: '5%',
        color: Colors.accentLightGrayText
    },
    mostRecentImageViewStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        maxWidth: '90%',
        overflow: 'hidden',
        marginTop: 7,
        borderRadius: 10
    },
    iconViewStyle: {
        backgroundColor: Colors.accentLightGray,
        paddingHorizontal: 5,
        paddingVertical: 5,
        borderRadius: 10,
        alignItems: 'center',
        marginHorizontal: 20,
        width: '50%'
    },
    iconTOStyle: {
        width: '50%',
        justifyContent: 'center',
        alignItems: 'center'
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
    }
});

export default HomeScreen;
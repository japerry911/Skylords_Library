import React, { useEffect, useState, useContext } from 'react';
import { StyleSheet, View, TouchableOpacity, ScrollView } from 'react-native';
import { Container, Body, Footer, Text, Spinner, Drawer } from 'native-base';
import Colors from '../constants/colors';
import { SimpleLineIcons, FontAwesome, MaterialCommunityIcons, MaterialIcons, AntDesign } from '@expo/vector-icons';
import FooterIconButton from '../components/FooterIconButton';
import RecentReviewItem from '../components/RecentReviewItem';
import { Context as UserContext } from '../contexts/userContext';
import { Context as ReviewContext } from '../contexts/reviewContext';

const HomeScreen = ({ navigation }) => {
    const userContext = useContext(UserContext);
    const reviewContext = useContext(ReviewContext);
    const { state: userState } = userContext;
    const { state: reviewState, pullTwoMostRecentReviews } = reviewContext;

    const user = userState.user;

    useEffect(() => {
        pullTwoMostRecentReviews();
    }, []);
    
    return ( 
        <Container>
            {reviewState.twoMostRecentReviews === undefined ?
            <Container style={{justifyContent: 'center'}}>
                <Spinner color='green' />
            </Container> : 
            <Container style={styles.mainContainerStyle}>
                <Body style={styles.bodyStyle}>
                    <Text style={styles.greetingMessageStyle}>
                        Hello, {user.username}!
                    </Text>
                    <Text style={styles.subtitleGreetingStyle}>
                        Let's find your new favorite book.
                    </Text>
                    <View style={styles.bodyIconViewStyle}>
                        <TouchableOpacity 
                            style={styles.iconTOStyle}
                            onPress={() => navigation.navigate('Books')}
                        >
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
                        <TouchableOpacity 
                            style={styles.iconTOStyle}
                            onPress={() => navigation.navigate('Add a Review')}
                        >
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
                    <ScrollView>
                        <Text style={styles.mostRecentTitleStyle}>
                            Recent Reviews
                        </Text>
                        {reviewState.twoMostRecentReviews.map(mostRecentObject => {
                            return (
                                <RecentReviewItem
                                    key={mostRecentObject.review.id}
                                    imageUrl={mostRecentObject.book.image_url}
                                    description={mostRecentObject.review.description === undefined ? '' : mostRecentObject.review.description}
                                    username={mostRecentObject.user.username}
                                    rating={mostRecentObject.review.rating}
                                />
                            );
                        })}
                    </ScrollView>
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
            </Container>}
        </Container>
    );
};

const styles = StyleSheet.create({
    footerStyle: {
        justifyContent: 'space-evenly',
        backgroundColor: Colors.accentLightGray
    },
    mostRecentTitleStyle: {
        fontSize: 20,
        fontFamily: 'Avenir_medium',
        marginVertical: '5%',
        color: Colors.accentLightGrayText,
        textAlign: 'center'
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
    iconViewStyle: {
        backgroundColor: Colors.accentLightGray,
        paddingHorizontal: 5,
        paddingVertical: 5,
        borderRadius: 10,
        alignItems: 'center',
        marginHorizontal: '5%',
        width: '80%',
    },
    iconTOStyle: {
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
        justifyContent: 'space-evenly',
        marginBottom: '3%'
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
        marginVertical: '5%',
    }
});

export default HomeScreen;
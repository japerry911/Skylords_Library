import React, { useContext, useEffect, useCallback, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import Colors from '../constants/colors';
import { MaterialIcons, Foundation } from '@expo/vector-icons';
import AuthedFooter from '../components/AuthedFooter';
import { Context as UserContext } from '../contexts/userContext';
import { Context as ReviewContext } from '../contexts/reviewContext';
import { useFocusEffect } from '@react-navigation/native';
import ShowReviewItem from '../components/ShowReviewItem';

const ProfileScreen = ({ navigation }) => {
    const [userReviews, setUserReviews] = useState([]);

    const userContext = useContext(UserContext);
    const reviewContext = useContext(ReviewContext);

    const { state: userState } = userContext
    const { state: reviewState, getReviews, deleteReview } = reviewContext;

    useFocusEffect(useCallback(() => {
        setUserReviews(reviewState.reviews.filter(review => review.user.id === userState.user.id));
    }, [reviewState.reviews]))

    useEffect(() => {
        getReviews();
    }, []);

    return (
        <View style={styles.mainViewStyle}>
            <View style={styles.headerViewStyle}>
                <TouchableOpacity onPress={() => {
                    navigation.navigate('Home');
                }}>
                    <MaterialIcons 
                        name='chevron-left'
                        size={40}
                        style={styles.backIconStyle}
                    />
                </TouchableOpacity>
                <Text style={styles.headerTitleStyle}>
                    My Profile
                </Text>
            </View>
            <View style={styles.bodyViewStyle}>
                <FlatList
                    ListHeaderComponent={
                        <>
                            <Text style={styles.titleTextStyle}>
                                {userState.user.username}
                            </Text>
                            <Text style={styles.subtitleTextStyle}>
                                Age: {userState.user.age}
                            </Text>
                            <Text style={styles.mobileEmailTextStyle}>
                                Mobile
                            </Text>
                            <View style={styles.mobileEmailViewStyle}>
                                <MaterialIcons
                                    style={styles.phoneIconStyle}
                                    name='phone-in-talk'
                                    size={40}
                                />
                                <View style={styles.textViewStyle}>
                                    <Text style={styles.mobileEmailValueStyle}>
                                        {userState.user.phone}
                                    </Text>
                                </View>
                            </View>
                            <Text style={styles.mobileEmailTextStyle}>
                                Email
                            </Text>
                            <View style={styles.mobileEmailViewStyle}>
                                <Foundation
                                    style={styles.emailIconStyle}
                                    name='mail'
                                    size={40}
                                />
                                <View style={styles.textViewStyle}>
                                    <Text style={styles.mobileEmailValueStyle}>
                                        {userState.user.email}
                                    </Text>
                                </View>
                            </View>
                            <Text style={styles.reviewsTitleStyle}>
                                Your Reviews
                            </Text>
                        </>                        
                    }
                    data={userReviews}
                    keyExtractor={review => review.id}
                    renderItem={({ item }) => <ShowReviewItem 
                                                review={item} 
                                                deleteButton={true} 
                                                showBook={true}
                                                deleteAction={deleteReview}
                                              />}
                />
            </View>
            <AuthedFooter parentNavigation={navigation} />
        </View>
    );
};

const styles = StyleSheet.create({
    reviewsTitleStyle: {
        color: Colors.accentLightGrayText,
        fontSize: 18,
        fontFamily: 'Avenir_bold',
        paddingTop: '6%'
    },
    textViewStyle: {
        backgroundColor: Colors.primaryOrange,
        width: '80%',
        paddingHorizontal: '2%',
        paddingTop: '2%',
        borderRadius: 10
    },
    mobileEmailValueStyle: {
        color: Colors.accentLightWhite,
        fontSize: 18,
        fontFamily: 'Avenir_next'
    },
    emailIconStyle: {
        marginHorizontal: '3%',
        color: Colors.primaryOrange
    },
    phoneIconStyle: {
        marginHorizontal: '2%',
        color: Colors.primaryOrange
    },
    mobileEmailTextStyle: {
        fontFamily: 'Avenir_bold',
        fontSize: 18,
        color: Colors.accentLightGrayText,
        marginTop: '5%'
    },
    mobileEmailViewStyle: {
        flexDirection: 'row',
        alignSelf: 'flex-start',
        alignItems: 'center'
    },
    subtitleTextStyle: {
        fontSize: 18,
        fontFamily: 'Avenir_medium',
        color: Colors.accentLightGrayText,
        textAlign: 'center'
    },
    titleTextStyle: {
        fontSize: 24,
        fontFamily: 'Avenir_medium',
        color: 'black',
        textAlign: 'center'
    },
    mainViewStyle: {
        backgroundColor: Colors.accentLightGray,
        flex: 1
    },
    backIconStyle: {
        height: 50,
        color: Colors.primaryOrange
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
    }, 
    bodyViewStyle: {
        backgroundColor: Colors.accentLightWhite,
        flex: 1,
        marginHorizontal: '4%',
        paddingHorizontal: '4%',
        borderRadius: 10,
        alignItems: 'center',
        paddingTop: '2%'
    }
});

export default ProfileScreen;
import React, { useEffect, useContext, useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, FlatList } from 'react-native';
import Colors from '../constants/colors';
import { SimpleLineIcons, FontAwesome, MaterialCommunityIcons, AntDesign } from '@expo/vector-icons';
import RecentReviewItem from '../components/RecentReviewItem';
import { Context as UserContext } from '../contexts/userContext';
import { Context as ReviewContext } from '../contexts/reviewContext';
import AuthedFooter from '../components/AuthedFooter';
import Spinner from '../components/Spinner';

const HomeScreen = ({ navigation }) => {
    const [isLoading, setIsLoading] = useState(true);

    const userContext = useContext(UserContext);
    const reviewContext = useContext(ReviewContext);

    const { state: userState } = userContext;
    const { state: reviewState, pullTwoMostRecentReviews } = reviewContext;

    const user = userState.user;

    useEffect(() => {
        pullTwoMostRecentReviews();
    }, [reviewState.reviews.length]);

    useEffect(() => {
        if (reviewState.twoMostRecentReviews.length > 0) {
            setIsLoading(false);
        }
    }, [reviewState.twoMostRecentReviews]);
    
    return ( 
        <>
            {isLoading ? <Spinner /> : 
            <View style={styles.screenViewStyle}>
                <View style={styles.bodyViewStyle}>
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
                                    Books
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
                        <TouchableOpacity 
                            style={styles.iconTOStyle}
                            onPress={() => navigation.navigate('Favorites')}
                        >
                            <View style={styles.iconViewStyle}>
                                <MaterialCommunityIcons
                                    name='bookmark-outline'
                                    style={styles.iconStyle}
                                    size={27}
                                />
                                <Text style={styles.iconTextStyle}>
                                    Favorites
                                </Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            style={styles.iconTOStyle}
                            onPress={() => navigation.navigate('My Profile')}
                        >
                            <View style={styles.iconViewStyle}>
                                <AntDesign 
                                    name='user'
                                    style={styles.iconStyle}
                                    size={28}
                                />
                                <Text style={styles.iconTextStyle}>
                                    My Profile
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <FlatList
                        ListHeaderComponent={
                            <Text style={styles.mostRecentTitleStyle}>
                                Recent Reviews
                            </Text>
                        }
                        data={reviewState.twoMostRecentReviews}
                        keyExtractor={review => review.review.id}
                        renderItem={({ item }) => {
                            return (
                                <RecentReviewItem
                                    key={item.review.id}
                                    imageUrl={item.book.image_url}
                                    description={item.review.description === undefined ? '' : item.review.description}
                                    username={item.user.username}
                                    rating={item.review.rating}
                                />
                            );
                        }}
                        showsVerticalScrollIndicator={false}
                    />
                </View>
                <AuthedFooter parentNavigation={navigation} />
            </View>}
        </>
    );
};

const styles = StyleSheet.create({
    mostRecentTitleStyle: {
        fontSize: 20,
        fontFamily: 'Avenir_medium',
        marginVertical: '5%',
        color: Colors.accentLightGrayText,
        textAlign: 'center'
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
        width: '90%' ,
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
    screenViewStyle:  {
        backgroundColor: Colors.accentLightGray,
        flex: 1,
        alignItems: 'center'
    },
    bodyViewStyle: {
        backgroundColor: Colors.accentLightWhite,
        width: '90%',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        marginTop: '5%',
        borderRadius: 10,
        height: '90%'
    }
});

export default HomeScreen;
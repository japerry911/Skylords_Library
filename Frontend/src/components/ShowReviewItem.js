import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'native-base';
import Colors from '../constants/colors';
import { Rating } from 'react-native-ratings';

const ShowReviewItem = ({ review }) => {
    return (
        <View style={styles.mainViewStyle}>
            {review.description === null 
            ? 
            <Text style={styles.reviewTextStyle}>No Content</Text>
            : 
            <Text style={styles.reviewTextStyle}>"{review.description}"</Text>
            }
            <Text style={styles.usernameTextStyle}>{review.user.username}</Text>
            <Rating 
                type='star'
                startingValue={review.rating}
                imageSize={15}
                tintColor={Colors.accentLightGray}
                selectedColor={Colors.primaryOrange}
                type='custom'
                ratingColor={Colors.primaryOrange}
                style={styles.ratingStyle}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    ratingStyle: {
        paddingBottom: '3%'
    },
    usernameTextStyle: {
        fontFamily: 'Avenir_italicize',
        fontSize: 14,
        color: Colors.accentLightGrayText,
        paddingHorizontal: 20,
        paddingBottom: 10
    },
    mainViewStyle: {
        backgroundColor: Colors.accentLightGray,
        borderRadius: 10,
        marginVertical: '6%',
        width: 300
    },
    reviewTextStyle: {
        fontSize: 14,
        fontFamily: 'Avenir_medium',
        paddingHorizontal: 20,
        paddingTop: 10,
        paddingBottom: 5,
        color: Colors.accentLightGrayText
    }
});

export default ShowReviewItem;
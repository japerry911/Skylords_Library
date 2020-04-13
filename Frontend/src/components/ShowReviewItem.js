import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import Colors from '../constants/colors';
import { Rating } from 'react-native-ratings';

const ShowReviewItem = ({ review, deleteButton, showBook, deleteAction }) => {
    return (
        <View style={styles.mainViewStyle}>
            {showBook !== undefined 
            ?
            <Text style={styles.bookTitleStyle}>
                {review.book.title} - {review.book.author.name}
            </Text>
            :
            null}
            {review.description === null || review.description === '' || review.description === undefined
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
                readonly
            />
            {deleteButton !== undefined
            ?
            <TouchableOpacity
                style={styles.deleteButtonStyle}
                onPress={() => deleteAction(review.id)}
            >
                <Text style={styles.deleteButtonTextStyle}>
                    Delete
                </Text>
            </TouchableOpacity>
            :
            null}
        </View>
    );
};

const styles = StyleSheet.create({
    bookTitleStyle: {
        fontSize: 16,
        fontFamily: 'Avenir_bold',
        textAlign: 'center',
        paddingTop: '4%',
        color: Colors.accentLightGrayText
    },
    deleteButtonStyle: {
        alignSelf: 'flex-end',
        paddingBottom: '4%',
        paddingHorizontal: '4%'
    },
    deleteButtonTextStyle: {
        color: Colors.primaryOrange,
        fontFamily: 'Avenir_bold',
        fontSize: 14
    },
    ratingStyle: {
        paddingBottom: '3%'
    },
    usernameTextStyle: {
        fontFamily: 'Avenir_italicize',
        fontSize: 14,
        color: Colors.accentLightGrayText,
        paddingHorizontal: 20,
        paddingBottom: 5,
        textAlign: 'center'
    },
    mainViewStyle: {
        backgroundColor: Colors.accentLightGray,
        borderRadius: 10,
        marginVertical: '6%',
        width: 300,
        alignSelf: 'center'
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
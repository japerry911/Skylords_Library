import React from 'react';
import { View, StyleSheet, Image, Dimensions } from 'react-native';
import { Rating } from 'react-native-ratings';
import { Text } from 'native-base';
import Colors from '../constants/colors';

const RecentReviewItem = ({ imageUrl, description, username, rating }) => {
    return (
    <View style={styles.itemViewStyle}>
        <Image
            source={{ uri: imageUrl }}
            style={styles.imageStyle}
        />                       
        <View style={styles.textViewStyle}>
            <Text style={styles.mostRecentReviewItalStyle}>
                {description === null || description === '' ? "No Content" : `"${description}"`}
                {'\n\t'}- <Text style={styles.mostRecentReviewMedStyle}>
                {username}</Text>
            </Text>
            <Rating 
                type='star'
                startingValue={rating}
                imageSize={20}
                tintColor={Colors.accentLightGray}
                selectedColor={Colors.primaryOrange}
                type='custom'
                ratingColor={Colors.primaryOrange}
                readonly
                style={styles.ratingStyle}
            />
        </View>
    </View>
    );
};

const styles = StyleSheet.create({
    ratingStyle: {
        marginTop: '21%'
    },
    imageStyle: {
        height: '100%',
        aspectRatio: 1,
        width: '30%',
        resizeMode: 'contain'
    },
    mostRecentViewStyle: {
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexDirection: 'row',
    },
    itemViewStyle: {
        paddingVertical: '3%',
        flexDirection: 'row',
        marginVertical: '1%',
        overflow: 'hidden',
        flex: 1,
        alignItems: 'center'
    },
    mostRecentReviewItalStyle: {
        fontSize: 13,
        fontFamily: 'Avenir_bold',
        color: Colors.accentLightGrayText
    },
    mostRecentReviewMedStyle: {
        color: Colors.accentLightGrayText,
        fontFamily: 'Avenir_medium'
    },
    textViewStyle: {
        marginLeft: '5%',
        width: '60%',
        flexShrink: 1,
        backgroundColor: Colors.accentLightGray,
        padding: '5%',
        borderRadius: 20
    }
});

export default RecentReviewItem;
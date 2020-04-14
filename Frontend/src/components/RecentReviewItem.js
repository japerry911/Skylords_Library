import React from 'react';
import { View, StyleSheet, Image, Dimensions } from 'react-native';
import { Rating } from 'react-native-ratings';
import { Text } from 'native-base';
import Colors from '../constants/colors';

const RecentReviewItem = ({ imageUrl, description, username, rating }) => {
    return (
    <View style={styles.mostRecentViewStyle}>
        <View style={styles.mostRecentImageViewStyle}>
            <Image
                source={{ uri: imageUrl }}
                style={styles.mostRecentImageStyle}
            />                       
        </View>
        <View style={styles.mostRecentReviewStyle}>
            <Text style={styles.mostRecentReviewItalStyle}>
                {description === null || description === '' ? "No Content" : `"${description}"`}
                {'\n\t'}- <Text style={styles.mostRecentReviewMedStyle}>
                {username}</Text>
            </Text>
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
                <Rating 
                    type='star'
                    startingValue={rating}
                    imageSize={20}
                    tintColor={Colors.accentLightGray}
                    selectedColor={Colors.primaryOrange}
                    type='custom'
                    ratingColor={Colors.primaryOrange}
                    readonly
                />
            </View>
        </View>
    </View>
    );
};

const styles = StyleSheet.create({
    mostRecentImageStyle: {
        flexGrow: 1,
        aspectRatio: 1,
        maxHeight: Dimensions.get('window').height / 8,
        maxWidth: Dimensions.get('window').width / 3,
        opacity: .50,
        resizeMode: 'contain',
    },
    mostRecentViewStyle: {
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexDirection: 'row',
    },
    mostRecentReviewStyle: {
        backgroundColor: Colors.accentLightGray,
        padding: '3%',
        borderRadius: 10,
        width: '70%',
        marginVertical: '5%'
    },
    mostRecentReviewItalStyle: {
        color: Colors.accentLightGrayText,
        fontFamily: 'Avenir_italicize',
        flexShrink: 1
    },
    mostRecentReviewMedStyle: {
        color: Colors.accentLightGrayText,
        fontFamily: 'Avenir_medium'
    },
    mostRecentImageViewStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        maxWidth: '80%',
        overflow: 'hidden',
        borderRadius: 10
    }
});

export default RecentReviewItem;
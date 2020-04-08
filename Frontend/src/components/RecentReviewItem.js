import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
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
                "{description}" {'\n\t'}- <Text style={styles.mostRecentReviewMedStyle}>
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
        height: 300, 
        minWidth: 200, 
        opacity: .50
    },
    mostRecentViewStyle: {
        height: 500,
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingBottom: '10%'
    },
    mostRecentReviewStyle: {
        backgroundColor: Colors.accentLightGray,
        padding: 10,
        marginTop: '5%',
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
    mostRecentImageViewStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        maxWidth: '90%',
        overflow: 'hidden',
        borderRadius: 10
    }
});

export default RecentReviewItem;
import React from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import Colors from '../constants/colors';

const FavoriteListItem = ({ title, author, imageUrl, handleDeleteFavorite, id }) => {
    return (
        <View style={styles.itemViewStyle}>
            <Image
                source={{ uri: imageUrl }}
                style={styles.imageStyle}
            />
            <View style={styles.textViewStyle}>
                <Text style={styles.titleTextStyle}>
                    {title}
                </Text>
                <Text style={styles.authorTextStyle}>
                    by {author}
                </Text>
            </View>
            <TouchableOpacity 
                style={styles.viewButtonStyle}
                onPress={() => {}}
            >
                <Text
                    style={styles.highlightStyle}
                    onPress={() => handleDeleteFavorite(id)}
                >
                    Delete
                </Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    viewButtonStyle: {
        alignSelf: 'center'
    },
    highlightStyle: {
        color: Colors.primaryOrange,
        fontSize: 13
    },
    imageStyle: {
        height: '100%',
        width: '30%',
        resizeMode: 'contain'
    },
    itemViewStyle: {
        paddingVertical: '3%',
        flexDirection: 'row',
        marginVertical: '3%',
        overflow: 'hidden',
        flexDirection: 'row',
        minHeight: '100%'
    },
    titleTextStyle: {
        fontSize: 13,
        fontFamily: 'Avenir_bold',
        color: Colors.accentLightGrayText,
    },
    authorTextStyle: {
        fontSize: 13, 
        fontFamily: 'Avenir_medium',
        color: Colors.accentLightGrayText,
        marginBottom: '3%',
    },
    textViewStyle: {
        marginLeft: '10%',
        marginRight: '3%',
        width: '40%'
    }
});

export default FavoriteListItem;
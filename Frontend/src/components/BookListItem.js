import React from 'react';
import { Text } from 'native-base';
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import Colors from '../constants/colors';

const BookListItem = ({ title, author, imageUrl, description }) => {
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
                <Text style={styles.descriptionTextStyle}>
                    {description}
                </Text>
            </View>
            <TouchableOpacity style={styles.viewButtonStyle}>
                <Text style={styles.highlightStyle}>
                    View
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
        width: '20%',
        resizeMode: 'stretch'
    },
    itemViewStyle: {
        flexDirection: 'row',
        marginVertical: '3%',
        overflow: 'hidden',
        flexDirection: 'row',
    },
    titleTextStyle: {
        fontSize: 13,
        fontFamily: 'Avenir_bold',
        color: Colors.accentLightGrayText
    },
    authorTextStyle: {
        fontSize: 13, 
        fontFamily: 'Avenir_medium',
        color: Colors.accentLightGrayText,
        marginBottom: '3%'
    },
    descriptionTextStyle: {
        fontSize: 13,
        fontFamily: 'Avenir_next',
        fontSize: 13,
        color: Colors.accentLightGrayText
    },
    textViewStyle: {
        marginLeft: '10%',
        marginRight: '3%',
        width: '55%'
    }
});

export default BookListItem;
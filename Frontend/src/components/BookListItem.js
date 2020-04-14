import React from 'react';
import { StyleSheet, View, Image, TouchableOpacity, Text } from 'react-native';
import Colors from '../constants/colors';

const BookListItem = ({ bookId, title, author, imageUrl, description, navigation }) => {
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
            <TouchableOpacity 
                style={styles.viewButtonStyle}
                onPress={() => navigation.navigate('ShowBook', { bookId })}
            >
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
        aspectRatio: 1,
        width: '30%',
        resizeMode: 'contain'
    },
    itemViewStyle: {
        paddingVertical: '3%',
        flexDirection: 'row',
        marginVertical: '3%',
        overflow: 'hidden',
        flex: 1
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
        width: '40%',
        flex: 1
    },
    descriptionTextStyle: {
        fontSize: 13,
        fontFamily: 'Avenir_next',
        fontSize: 13,
        color: Colors.accentLightGrayText
    }
    
});

export default BookListItem;